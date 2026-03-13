import pool from '../config/db.js';

async function seed() {
  console.log('Seeding database...');

  try {
    // 1) Core tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id         BIGSERIAL PRIMARY KEY,
        email      TEXT UNIQUE,
        name       TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS categories (
        id   SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE
      );

      CREATE TABLE IF NOT EXISTS products (
        id            BIGSERIAL PRIMARY KEY,
        name          TEXT NOT NULL,
        description   TEXT,
        price         NUMERIC(10,2) NOT NULL,
        category_id   INTEGER NOT NULL REFERENCES categories(id),
        stock         INTEGER NOT NULL DEFAULT 0,
        rating        NUMERIC(2,1) NOT NULL DEFAULT 0,
        review_count  INTEGER NOT NULL DEFAULT 0,
        created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        image         TEXT
      );

      CREATE TABLE IF NOT EXISTS product_images (
        id          BIGSERIAL PRIMARY KEY,
        product_id  BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        image_url   TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS cart_items (
        id          BIGSERIAL PRIMARY KEY,
        user_id     BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        product_id  BIGINT NOT NULL REFERENCES products(id),
        quantity    INTEGER NOT NULL CHECK (quantity > 0),
        UNIQUE (user_id, product_id)
      );

      CREATE TABLE IF NOT EXISTS orders (
        id                BIGSERIAL PRIMARY KEY,
        user_id           BIGINT NOT NULL REFERENCES users(id),
        total_amount      NUMERIC(10,2) NOT NULL,
        shipping_address  TEXT NOT NULL,
        created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS order_items (
        id          BIGSERIAL PRIMARY KEY,
        order_id    BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
        product_id  BIGINT NOT NULL REFERENCES products(id),
        quantity    INTEGER NOT NULL,
        price       NUMERIC(10,2) NOT NULL
      );
    `);

    // 2) Seed categories
    await pool.query(`
      INSERT INTO categories (name) VALUES
        ('Electronics'),
        ('Clothing'),
        ('Books'),
        ('Home')
      ON CONFLICT (name) DO NOTHING;
    `);

    // 3) Seed a demo user for cart/orders
    await pool.query(`
      INSERT INTO users (id, email, name)
      VALUES (1, 'demo@example.com', 'Demo User')
      ON CONFLICT (id) DO NOTHING;
    `);

    // 4) Seed products with images
    await pool.query(`
      INSERT INTO products (name, description, price, category_id, stock, rating, review_count, image)
      VALUES
        -- Electronics (category_id = 1)
        ('Wireless Noise-Cancelling Headphones', 'Over-ear Bluetooth headphones with active noise cancellation.', 16599, 1, 120, 4.6, 342, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80'),
        ('4K UHD Smart TV 55"', '55-inch 4K smart TV with HDR and built-in streaming apps.', 41499, 1, 50, 4.4, 210, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80'),
        ('Bluetooth Portable Speaker', 'Water-resistant Bluetooth speaker with 12-hour battery life.', 4999, 1, 200, 4.5, 528, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80'),
        ('Gaming Laptop 15"', 'High-performance gaming laptop with RTX graphics.', 107999, 1, 25, 4.7, 189, 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80'),
        ('Wireless Mouse', 'Ergonomic 2.4GHz wireless mouse with adjustable DPI.', 1999, 1, 300, 4.3, 612, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80'),
        ('Mechanical Keyboard', 'RGB mechanical keyboard with tactile switches.', 7499, 1, 150, 4.5, 430, 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&q=80'),
        ('USB-C Fast Charger', '65W USB-C wall charger with PD support.', 2899, 1, 400, 4.4, 290, 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80'),
        ('Smartphone Tripod Stand', 'Adjustable tripod for smartphones with Bluetooth remote.', 2499, 1, 180, 4.2, 138, 'https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?w=400&q=80'),

        -- Clothing (category_id = 2)
        ('Men''s Classic Fit T-Shirt', 'Soft cotton crew-neck t-shirt.', 1249, 2, 500, 4.3, 980, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80'),
        ('Women''s High-Waisted Jeans', 'Stretch denim with slim fit.', 3299, 2, 220, 4.4, 512, 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80'),
        ('Unisex Hoodie', 'Fleece-lined pullover hoodie with kangaroo pocket.', 2499, 2, 300, 4.6, 742, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80'),
        ('Athletic Running Shoes', 'Breathable running shoes with cushioned sole.', 5799, 2, 150, 4.5, 320, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80'),
        ('Men''s Slim Fit Chinos', 'Casual slim-fit chinos for everyday wear.', 2899, 2, 180, 4.2, 210, 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80'),
        ('Women''s Sports Bra', 'Medium-support sports bra for workouts.', 2099, 2, 260, 4.4, 190, 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&q=80'),
        ('Pack of 5 Ankle Socks', 'Cotton blend ankle socks for men and women.', 1099, 2, 600, 4.5, 870, 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&q=80'),
        ('Lightweight Rain Jacket', 'Water-resistant hooded rain jacket.', 4149, 2, 120, 4.1, 135, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80'),

        -- Books (category_id = 3)
        ('JavaScript: The Definitive Guide', 'Comprehensive guide to modern JavaScript.', 3749, 3, 80, 4.7, 640, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80'),
        ('Clean Code', 'A Handbook of Agile Software Craftsmanship.', 3299, 3, 90, 4.8, 1200, 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80'),
        ('Atomic Habits', 'An Easy & Proven Way to Build Good Habits.', 1829, 3, 200, 4.8, 950, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80'),
        ('Deep Work', 'Rules for Focused Success in a Distracted World.', 1499, 3, 170, 4.6, 670, 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&q=80'),
        ('The Pragmatic Programmer', 'Your Journey to Mastery.', 3499, 3, 60, 4.7, 530, 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&q=80'),
        ('Design Patterns Explained', 'A New Perspective on Object-Oriented Design.', 2799, 3, 55, 4.3, 210, 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80'),
        ('The Lean Startup', 'How Today''s Entrepreneurs Use Continuous Innovation.', 1649, 3, 140, 4.5, 720, 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&q=80'),
        ('Introduction to Algorithms', 'Classic algorithms textbook.', 7499, 3, 40, 4.6, 380, 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=400&q=80'),

        -- Home (category_id = 4)
        ('Memory Foam Pillow', 'Ergonomic memory foam pillow with breathable cover.', 2499, 4, 190, 4.4, 510, 'https://images.unsplash.com/photo-1592789705501-f9ae4278a9c9?w=400&q=80'),
        ('Stainless Steel Cookware Set', '10-piece non-stick cookware set.', 10799, 4, 70, 4.5, 430, 'https://images.unsplash.com/photo-1584990347449-a6d17f35f5d9?w=400&q=80'),
        ('Cotton Bed Sheet Set', 'Queen-size 4-piece cotton bed sheet set.', 4149, 4, 160, 4.3, 380, 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80'),
        ('LED Desk Lamp', 'Dimmable LED lamp with USB charging port.', 2899, 4, 210, 4.4, 295, 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&q=80'),
        ('Vacuum Cleaner', 'Bagless upright vacuum cleaner with HEPA filter.', 13299, 4, 45, 4.2, 190, 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80'),
        ('Aromatherapy Diffuser', 'Ultrasonic essential oil diffuser with timer.', 2099, 4, 230, 4.5, 520, 'https://images.unsplash.com/photo-1602928298849-325cec8771c0?w=400&q=80'),
        ('Non-Slip Bath Mat', 'Quick-dry non-slip bath mat.', 1649, 4, 260, 4.3, 210, 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&q=80'),
        ('Set of 6 Storage Bins', 'Collapsible fabric storage bins with handles.', 2749, 4, 150, 4.4, 175, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80')
      ON CONFLICT DO NOTHING;
    `);

    // 5) Seed product_images from main image (optional simple variant)
    await pool.query(`
      INSERT INTO product_images (product_id, image_url)
      SELECT id, image
      FROM products
      WHERE image IS NOT NULL
      ON CONFLICT DO NOTHING;
    `);

    console.log('Database seeded successfully.');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    await pool.end();
  }
}

seed();

