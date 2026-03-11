require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

async function setup() {
  const sql = neon(process.env.DATABASE_URL);
  
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      image_url TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
  
  console.log('Products table created successfully!');
}

setup().catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
