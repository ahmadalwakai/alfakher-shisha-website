import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import {
  getProductById,
  updateProduct,
  deleteProduct,
  PRODUCT_CATEGORIES,
  ProductCategory,
  generatePlaceholderUrl,
  isPlaceholderImage,
} from "@/lib/db";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT: Update product
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const productId = parseInt(id, 10);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    // Check if product exists
    const existingProduct = await getProductById(productId);
    if (!existingProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const formData = await request.formData();

    const name = formData.get("name") as string;
    const category = formData.get("category") as ProductCategory;
    const imageFile = formData.get("image") as File | null;
    const removeImage = formData.get("removeImage") === "true";

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

    let imageUrl: string | null | undefined = undefined; // undefined means don't update

    // Handle image changes
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

      // Delete old image if it's a local file
      if (
        existingProduct.image_url &&
        !isPlaceholderImage(existingProduct.image_url)
      ) {
        try {
          const oldPath = path.join(
            process.cwd(),
            "public",
            existingProduct.image_url
          );
          await unlink(oldPath);
        } catch {
          // Ignore errors deleting old file
        }
      }

      // Generate unique filename
      const timestamp = Date.now();
      const ext = imageFile.name.split(".").pop() || "jpg";
      const filename = `product-${timestamp}.${ext}`;

      // Save file
      const uploadDir = path.join(process.cwd(), "public", "images", "products");
      await mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, filename);
      const bytes = await imageFile.arrayBuffer();
      await writeFile(filePath, Buffer.from(bytes));

      imageUrl = `/images/products/${filename}`;
    } else if (removeImage) {
      // Reset to placeholder
      imageUrl = generatePlaceholderUrl(name.trim());

      // Delete old image if it's a local file
      if (
        existingProduct.image_url &&
        !isPlaceholderImage(existingProduct.image_url)
      ) {
        try {
          const oldPath = path.join(
            process.cwd(),
            "public",
            existingProduct.image_url
          );
          await unlink(oldPath);
        } catch {
          // Ignore errors deleting old file
        }
      }
    }

    // Update product in database
    const result = await updateProduct(productId, name.trim(), category, imageUrl);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to update product" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Product updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the product" },
      { status: 500 }
    );
  }
}

// DELETE: Remove product
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const productId = parseInt(id, 10);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    // Check if product exists and get image path
    const existingProduct = await getProductById(productId);
    if (!existingProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Delete image if it's a local file
    if (
      existingProduct.image_url &&
      !isPlaceholderImage(existingProduct.image_url)
    ) {
      try {
        const imagePath = path.join(
          process.cwd(),
          "public",
          existingProduct.image_url
        );
        await unlink(imagePath);
      } catch {
        // Ignore errors deleting file
      }
    }

    // Delete product from database
    const result = await deleteProduct(productId);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to delete product" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the product" },
      { status: 500 }
    );
  }
}
