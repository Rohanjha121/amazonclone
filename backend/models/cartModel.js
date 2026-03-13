import pool from '../config/db.js';

// For demo purposes we use a fixed user id.
const DEFAULT_USER_ID = 1;

export async function getCartItems(userId = DEFAULT_USER_ID) {
  const result = await pool.query(
    `
      SELECT
        ci.id,
        ci.user_id,
        ci.product_id,
        ci.quantity,
        p.name,
        p.price,
        p.image
      FROM cart_items ci
      JOIN products p ON p.id = ci.product_id
      WHERE ci.user_id = $1
      ORDER BY ci.id ASC
    `,
    [userId]
  );
  return result.rows;
}

export async function addCartItem({ productId, quantity, userId = DEFAULT_USER_ID }) {
  // Upsert-style logic: if item already exists, increment quantity
  const existing = await pool.query(
    'SELECT id, quantity FROM cart_items WHERE user_id = $1 AND product_id = $2',
    [userId, productId]
  );

  if (existing.rows.length > 0) {
    const row = existing.rows[0];
    const updated = await pool.query(
      'UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *',
      [row.quantity + quantity, row.id]
    );
    return updated.rows[0];
  }

  const result = await pool.query(
    'INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
    [userId, productId, quantity]
  );
  return result.rows[0];
}

export async function updateCartItem(id, { quantity, userId = DEFAULT_USER_ID }) {
  const result = await pool.query(
    'UPDATE cart_items SET quantity = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
    [quantity, id, userId]
  );
  return result.rows[0] || null;
}

export async function deleteCartItem(id, userId = DEFAULT_USER_ID) {
  const result = await pool.query(
    'DELETE FROM cart_items WHERE id = $1 AND user_id = $2 RETURNING id',
    [id, userId]
  );
  return result.rows[0] || null;
}

