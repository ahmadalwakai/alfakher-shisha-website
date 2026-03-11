"use client";

import { useState, useEffect, FormEvent, useRef, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  PRODUCT_CATEGORIES,
  ProductCategory,
  Product,
  isPlaceholderImage,
} from "@/lib/db";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<ProductCategory>("shisha-pipes");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [removeCurrentImage, setRemoveCurrentImage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch("/api/admin/products");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch product");
      }

      const foundProduct = data.products.find(
        (p: Product) => p.id === parseInt(id, 10)
      );

      if (!foundProduct) {
        throw new Error("Product not found");
      }

      setProduct(foundProduct);
      setName(foundProduct.name);
      setCategory(foundProduct.category);
      setCurrentImageUrl(foundProduct.image_url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        setError("Only JPG, PNG, and WebP images are allowed");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Image must be 5MB or less");
        return;
      }

      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setRemoveCurrentImage(false);
      setError("");
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveCurrentImage = () => {
    setRemoveCurrentImage(true);
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      if (imageFile) {
        formData.append("image", imageFile);
      }
      if (removeCurrentImage) {
        formData.append("removeImage", "true");
      }

      const response = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update product");
      }

      router.push("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update product");
    } finally {
      setIsSaving(false);
    }
  };

  // Placeholder preview for when current image is removed
  const placeholderPreviewUrl = name.trim()
    ? `https://placehold.co/600x400/111111/C9A84C?text=${encodeURIComponent(name.trim())}`
    : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || "Product not found"}</p>
          <Link href="/admin/dashboard" className="text-accent hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <header className="bg-white/5 border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-accent">
              Edit Product
            </h1>
            <p className="text-white/50 text-sm">Update product details</p>
          </div>
          <Link
            href="/admin/dashboard"
            className="text-white/60 hover:text-white text-sm transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 rounded-sm p-6 md:p-8"
        >
          {/* Product Name */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white/80 mb-2"
            >
              Product Name <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={255}
              disabled={isSaving}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors disabled:opacity-50"
              placeholder="e.g., Premium Shisha Pipe"
            />
          </div>

          {/* Category */}
          <div className="mb-6">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-white/80 mb-2"
            >
              Category <span className="text-accent">*</span>
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as ProductCategory)}
              required
              disabled={isSaving}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors disabled:opacity-50"
            >
              {PRODUCT_CATEGORIES.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.id}
                  className="bg-primary text-white"
                >
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-white/80 mb-2">
              Product Image
            </label>

            {/* New Image Preview */}
            {imagePreview ? (
              <div className="relative aspect-[3/2] mb-4 rounded-sm overflow-hidden bg-primary border border-white/10">
                <Image
                  src={imagePreview}
                  alt="New image preview"
                  fill
                  className="object-contain"
                />
                <div className="absolute top-2 left-2 bg-green-500/90 text-white text-xs px-2 py-1 rounded-sm">
                  New Image
                </div>
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : removeCurrentImage && placeholderPreviewUrl ? (
              <div className="relative aspect-[3/2] mb-4 rounded-sm overflow-hidden bg-primary border border-white/10">
                <Image
                  src={placeholderPreviewUrl}
                  alt="Placeholder preview"
                  fill
                  className="object-contain"
                  unoptimized
                />
                <div className="absolute bottom-2 left-2 bg-yellow-500/90 text-primary text-xs px-2 py-1 rounded-sm font-medium">
                  Will use Placeholder
                </div>
              </div>
            ) : currentImageUrl ? (
              <div className="relative aspect-[3/2] mb-4 rounded-sm overflow-hidden bg-primary border border-white/10">
                <Image
                  src={currentImageUrl}
                  alt="Current image"
                  fill
                  className="object-contain"
                  unoptimized={isPlaceholderImage(currentImageUrl)}
                />
                {isPlaceholderImage(currentImageUrl) && (
                  <div className="absolute bottom-2 left-2 bg-yellow-500/90 text-primary text-xs px-2 py-1 rounded-sm font-medium">
                    Placeholder
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleRemoveCurrentImage}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                  title="Remove current image"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : null}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/jpeg,image/png,image/webp"
              disabled={isSaving}
              className="w-full text-white/60 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-accent file:text-primary file:font-medium file:rounded-sm file:cursor-pointer hover:file:bg-accent-light disabled:opacity-50"
            />
            <p className="text-white/40 text-xs mt-2">
              JPG, PNG or WebP. Max 5MB. Leave empty to keep the current image.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-500/20 border border-red-500/30 rounded-sm text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4">
            <Link
              href="/admin/dashboard"
              className="flex-1 bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-sm text-center transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSaving || !name.trim()}
              className="flex-1 bg-accent hover:bg-accent-light text-primary font-semibold py-3 rounded-sm uppercase tracking-wider text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <svg
                    className="w-5 h-5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
