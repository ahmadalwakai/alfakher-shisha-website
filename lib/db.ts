import { neon } from "@neondatabase/serverless";

// Create database connection - only runs on server side
const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL;
  if (!url) {
    return null;
  }
  return url;
};

// Check if database is available
export const isDatabaseConfigured = () => {
  return !!getDatabaseUrl();
};

// Get SQL connection
export const getDb = () => {
  const url = getDatabaseUrl();
  if (!url) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  return neon(url);
};

// Contact submission interface
export interface ContactSubmission {
  id?: number;
  name: string;
  email: string;
  message: string;
  created_at?: Date;
}

// Product types
export type ProductCategory =
  | "shisha-pipes"
  | "arab-traditional"
  | "al-fakher-moassal"
  | "al-nakhla-moassal"
  | "charcoal"
  | "glass-vases"
  | "bowls-heads"
  | "accessories"
  | "disposable-vapes";

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  image_url: string | null;
  created_at: Date;
}

export const PRODUCT_CATEGORIES: { id: ProductCategory; name: string }[] = [
  { id: "shisha-pipes", name: "Shisha Pipes" },
  { id: "arab-traditional", name: "Arab Traditional Shisha" },
  { id: "al-fakher-moassal", name: "Al Fakher Moassal" },
  { id: "al-nakhla-moassal", name: "Al Nakhla Moassal" },
  { id: "charcoal", name: "Charcoal" },
  { id: "glass-vases", name: "Shisha Glass & Vases" },
  { id: "bowls-heads", name: "Bowls & Heads" },
  { id: "accessories", name: "Accessories" },
  { id: "disposable-vapes", name: "Disposable Vapes" },
];

// Generate placeholder image URL
export function generatePlaceholderUrl(productName: string): string {
  // Simplify the text for the placeholder - remove special chars and limit length
  const simplifiedName = productName
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .substring(0, 20)
    .trim()
    .replace(/\s+/g, '+');
  return `https://placehold.co/600x400/111111/C9A84C?text=${simplifiedName || 'Product'}`;
}

// Check if image is a placeholder
export function isPlaceholderImage(url: string | null): boolean {
  return url?.includes("placehold.co") ?? false;
}

// Initialize products table
export async function initProductsTable(): Promise<void> {
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      image_url TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
}

// Get all products
export async function getProducts(): Promise<Product[]> {
  if (!isDatabaseConfigured()) {
    // Return empty array during build if DATABASE_URL is not set
    return [];
  }
  const sql = getDb();
  await initProductsTable();
  const result = await sql`
    SELECT id, name, category, image_url, created_at
    FROM products
    ORDER BY created_at DESC
  `;
  return result as Product[];
}

// Get single product
export async function getProductById(id: number): Promise<Product | null> {
  const sql = getDb();
  const result = await sql`
    SELECT id, name, category, image_url, created_at
    FROM products
    WHERE id = ${id}
  `;
  return (result[0] as Product) || null;
}

// Add new product
export async function addProduct(
  name: string,
  category: ProductCategory,
  imageUrl: string | null
): Promise<{ success: boolean; id?: number; error?: string }> {
  try {
    const sql = getDb();
    await initProductsTable();

    const finalImageUrl = imageUrl || generatePlaceholderUrl(name);

    const result = await sql`
      INSERT INTO products (name, category, image_url)
      VALUES (${name}, ${category}, ${finalImageUrl})
      RETURNING id
    `;

    return { success: true, id: result[0]?.id };
  } catch (error) {
    console.error("Error adding product:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add product",
    };
  }
}

// Update product
export async function updateProduct(
  id: number,
  name: string,
  category: ProductCategory,
  imageUrl?: string | null
): Promise<{ success: boolean; error?: string }> {
  try {
    const sql = getDb();

    if (imageUrl !== undefined) {
      await sql`
        UPDATE products
        SET name = ${name}, category = ${category}, image_url = ${imageUrl}
        WHERE id = ${id}
      `;
    } else {
      await sql`
        UPDATE products
        SET name = ${name}, category = ${category}
        WHERE id = ${id}
      `;
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update product",
    };
  }
}

// Delete product
export async function deleteProduct(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const sql = getDb();
    await sql`DELETE FROM products WHERE id = ${id}`;
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete product",
    };
  }
}

// Helper to save contact submission
export async function saveContactSubmission(
  submission: Omit<ContactSubmission, "id" | "created_at">
): Promise<{ success: boolean; id?: number; error?: string }> {
  try {
    const sql = getDb();

    // First, ensure the table exists
    await sql`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // Insert the submission
    const result = await sql`
      INSERT INTO contact_submissions (name, email, message)
      VALUES (${submission.name}, ${submission.email}, ${submission.message})
      RETURNING id
    `;

    return {
      success: true,
      id: result[0]?.id,
    };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Database error occurred",
    };
  }
}
