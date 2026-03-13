import pool from '../config/db.js';

const DEFAULT_USER_ID = 1;

export async function createOrder({ items, shippingAddress = 'N/A', userId = DEFAULT_USER_ID }) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Order must contain at least one item');
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const productIds = items.map((i) => i.product_id);
    const productsResult = await client.query(
      'SELECT id, price FROM products WHERE id = ANY($1)',
      [productIds]
    );
    const priceMap = new Map(productsResult.rows.map((p) => [p.id, p.price]));

    let totalAmount = 0;
    const orderItemsPayload = [];

    for (const item of items) {
      const price = priceMap.get(item.product_id);
      if (price == null) {
        throw new Error(`Product not found: ${item.product_id}`);
      }
      const lineTotal = Number(price) * item.quantity;
      totalAmount += lineTotal;

      orderItemsPayload.push({
        product_id: item.product_id,
        quantity: item.quantity,
        price
      });
    }

    const orderResult = await client.query(
      'INSERT INTO orders (user_id, total_amount, shipping_address) VALUES ($1, $2, $3) RETURNING *',
      [userId, totalAmount, shippingAddress]
    );
    const order = orderResult.rows[0];

    const orderItemsValues = [];
    const valuePlaceholders = [];
    orderItemsPayload.forEach((item, idx) => {
      const base = idx * 4;
      valuePlaceholders.push(
        `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4})`
      );
      orderItemsValues.push(
        order.id,
        item.product_id,
        item.quantity,
        item.price
      );
    });

    await client.query(
      `
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES ${valuePlaceholders.join(', ')}
      `,
      orderItemsValues
    );

    // Optional: clear the cart for this user
    await client.query('DELETE FROM cart_items WHERE user_id = $1', [userId]);

    await client.query('COMMIT');

    return order;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

export async function getOrderById(id, userId = DEFAULT_USER_ID) {
  const orderResult = await pool.query(
    'SELECT * FROM orders WHERE id = $1 AND user_id = $2',
    [id, userId]
  );

  if (orderResult.rows.length === 0) {
    return null;
  }

  const itemsResult = await pool.query(
    `
      SELECT
        oi.id,
        oi.product_id,
        oi.quantity,
        oi.price,
        p.name
      FROM order_items oi
      JOIN products p ON p.id = oi.product_id
      WHERE oi.order_id = $1
      ORDER BY oi.id ASC
    `,
    [id]
  );

  const order = orderResult.rows[0];
  order.items = itemsResult.rows;
  return order;
}

