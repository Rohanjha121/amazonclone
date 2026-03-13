import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'amazonclone'
});

const updates = [
  // Electronics
  { name: 'Wireless Noise-Cancelling Headphones', price: 16599, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80' },
  { name: '4K UHD Smart TV 55"', price: 41499, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80' },
  { name: 'Bluetooth Portable Speaker', price: 4999, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80' },
  { name: 'Gaming Laptop 15"', price: 107999, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80' },
  { name: 'Wireless Mouse', price: 1999, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80' },
  { name: 'Mechanical Keyboard', price: 7499, image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&q=80' },
  { name: 'USB-C Fast Charger', price: 2899, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80' },
  { name: 'Smartphone Tripod Stand', price: 2499, image: 'https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?w=400&q=80' },
  // Clothing
  { name: "Men's Classic Fit T-Shirt", price: 1249, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80' },
  { name: "Women's High-Waisted Jeans", price: 3299, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80' },
  { name: 'Unisex Hoodie', price: 2499, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80' },
  { name: 'Athletic Running Shoes', price: 5799, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
  { name: "Men's Slim Fit Chinos", price: 2899, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80' },
  { name: "Women's Sports Bra", price: 2099, image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&q=80' },
  { name: 'Pack of 5 Ankle Socks', price: 1099, image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&q=80' },
  { name: 'Lightweight Rain Jacket', price: 4149, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80' },
  // Books
  { name: 'JavaScript: The Definitive Guide', price: 3749, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80' },
  { name: 'Clean Code', price: 3299, image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80' },
  { name: 'Atomic Habits', price: 1829, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80' },
  { name: 'Deep Work', price: 1499, image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&q=80' },
  { name: 'The Pragmatic Programmer', price: 3499, image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&q=80' },
  { name: 'Design Patterns Explained', price: 2799, image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80' },
  { name: 'The Lean Startup', price: 1649, image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&q=80' },
  { name: 'Introduction to Algorithms', price: 7499, image: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=400&q=80' },
  // Home
  { name: 'Memory Foam Pillow', price: 2499, image: 'https://images.unsplash.com/photo-1592789705501-f9ae4278a9c9?w=400&q=80' },
  { name: 'Stainless Steel Cookware Set', price: 10799, image: 'https://images.unsplash.com/photo-1584990347449-a6d17f35f5d9?w=400&q=80' },
  { name: 'Cotton Bed Sheet Set', price: 4149, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80' },
  { name: 'LED Desk Lamp', price: 2899, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&q=80' },
  { name: 'Vacuum Cleaner', price: 13299, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80' },
  { name: 'Aromatherapy Diffuser', price: 2099, image: 'https://images.unsplash.com/photo-1602928298849-325cec8771c0?w=400&q=80' },
  { name: 'Non-Slip Bath Mat', price: 1649, image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&q=80' },
  { name: 'Set of 6 Storage Bins', price: 2749, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80' },
];

async function updateProducts() {
  console.log('Updating product prices to INR and images...');
  try {
    for (const u of updates) {
      const result = await pool.query(
        'UPDATE products SET price = $1, image = $2 WHERE name = $3',
        [u.price, u.image, u.name]
      );
      console.log(`  ${u.name}: ${result.rowCount} row(s) updated`);
    }

    // Also update product_images table
    await pool.query(`
      UPDATE product_images pi
      SET image_url = p.image
      FROM products p
      WHERE pi.product_id = p.id
    `);

    console.log('All products updated successfully!');
  } catch (err) {
    console.error('Error updating products:', err);
  } finally {
    await pool.end();
  }
}

updateProducts();
