import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import {
  getProducts,
  addProduct,
  PRODUCT_CATEGORIES,
  ProductCategory,
  generatePlaceholderUrl,
} from "@/lib/db";

// GET: Fetch all products
export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST: Add new product
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const category = formData.get("category") as ProductCategory;
    const imageFile = formData.get("image") as File | null;

    // Validate required fields
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Product name is required" },
        { status: 400 }
      );
    }

    if (name.length > 255) {
      return NextResponse.json(
        { error: "Product name must be 255 characters or less" },
        { status: 400 }
      );
    }

    // Validate category
    const validCategories = PRODUCT_CATEGORIES.map((c) => c.id);
    if (!category || !validCategories.includes(category)) {
      return NextResponse.json(
        { error: "Invalid category" },
        { status: 400 }
      );
    }

    let imageUrl: string | null = null;

    // Handle image upload if provided
    if (imageFile && imageFile.size > 0) {
      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(imageFile.type)) {
        return NextResponse.json(
          { error: "Only JPG, PNG, and WebP images are allowed" },
          { status: 400 }
        );
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024;
      if (imageFile.size > maxSize) {
        return NextResponse.json(
          { error: "Image must be 5MB or less" },
          { status: 400 }
        );
      }

      // Generate unique filename
      const timestamp = Date.now();
      const ext = imageFile.name.split(".").pop() || "jpg";
      const filename = `product-${timestamp}.${ext}`;

      // Save file to /public/images/products/
      const uploadDir = path.join(process.cwd(), "public", "images", "products");
      await mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, filename);
      const bytes = await imageFile.arrayBuffer();
      await writeFile(filePath, Buffer.from(bytes));

      imageUrl = `/images/products/${filename}`;
    } else {
      // Generate placeholder URL if no image provided
      imageUrl = generatePlaceholderUrl(name.trim());
    }

    // Add product to database
    const result = await addProduct(name.trim(), category, imageUrl);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to add product" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, id: result.id, message: "Product added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "An error occurred while adding the product" },
      { status: 500 }
    );
  }
}
