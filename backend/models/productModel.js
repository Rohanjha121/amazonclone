import pool from '../config/db.js';

export async function getProducts({ page = 1, limit = 12, categoryId, search }) {
  const offset = (page - 1) * limit;
  const values = [];
  const whereClauses = [];

  if (categoryId) {
    values.push(categoryId);
    whereClauses.push(`category_id = $${values.length}`);
  }

  if (search) {
    values.push(`%${search}%`);
    whereClauses.push(`LOWER(name) LIKE LOWER($${values.length})`);
  }

  const whereSql = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';

  const countQuery = `SELECT COUNT(*) AS total FROM products ${whereSql}`;
  const countResult = await pool.query(countQuery, values);
  const total = Number(countResult.rows[0].total);

  values.push(limit);
  values.push(offset);

  const productsQuery = `
    SELECT
      p.*,
      c.name AS category_name
    FROM products p
    JOIN categories c ON c.id = p.category_id
    ${whereSql}
    ORDER BY p.created_at DESC
    LIMIT $${values.length - 1} OFFSET $${values.length}
  `;

  const productsResult = await pool.query(productsQuery, values);

  return {
    items: productsResult.rows,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit) || 1
  };
}

export async function getProductById(id) {
  const productResult = await pool.query(
    `
      SELECT
        p.*,
        c.name AS category_name
      FROM products p
      JOIN categories c ON c.id = p.category_id
      WHERE p.id = $1
    `,
    [id]
  );

  if (productResult.rows.length === 0) return null;

  const imagesResult = await pool.query(
    'SELECT id, image_url FROM product_images WHERE product_id = $1 ORDER BY id ASC',
    [id]
  );

  const product = productResult.rows[0];
  product.images = imagesResult.rows.map((row) => row.image_url);
  return product;
}

export async function searchProductsByName(query, { page = 1, limit = 12 }) {
  return getProducts({ page, limit, search: query });
}

