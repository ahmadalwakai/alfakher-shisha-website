"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Product, PRODUCT_CATEGORIES, isPlaceholderImage } from "@/lib/db";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/admin/products");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch products");
      }

      setProducts(data.products);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin");
    } catch {
      // Redirect anyway
      router.push("/admin");
    }
  };

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete product");
      }

      setProducts(products.filter((p) => p.id !== id));
      setDeleteId(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete product");
    } finally {
      setIsDeleting(false);
    }
  };

  const getCategoryName = (categoryId: string) => {
    return (
      PRODUCT_CATEGORIES.find((c) => c.id === categoryId)?.name || categoryId
    );
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <header className="bg-white/5 border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-accent">
              Admin Dashboard
            </h1>
            <p className="text-white/50 text-sm">Manage your products</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-sm text-sm transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-xl text-white">
            Products ({products.length})
          </h2>
          <Link
            href="/admin/dashboard/add"
            className="bg-accent hover:bg-accent-light text-primary font-semibold px-4 py-2 rounded-sm text-sm uppercase tracking-wider transition-colors"
          >
            + Add New Product
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-16">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/60">Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-sm p-4 text-red-400">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && products.length === 0 && (
          <div className="text-center py-16 bg-white/5 rounded-sm border border-white/10">
            <svg
              className="w-16 h-16 mx-auto text-white/20 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <h3 className="text-white font-heading text-xl mb-2">
              No products yet
            </h3>
            <p className="text-white/60 mb-6">
              Add your first product to get started
            </p>
            <Link
              href="/admin/dashboard/add"
              className="bg-accent hover:bg-accent-light text-primary font-semibold px-6 py-3 rounded-sm text-sm uppercase tracking-wider transition-colors inline-block"
            >
              Add Product
            </Link>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && products.length > 0 && (
          <div className="grid gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white/5 border border-white/10 rounded-sm p-4 flex items-center gap-4 hover:bg-white/10 transition-colors"
              >
                {/* Thumbnail */}
                <div className="relative w-16 h-16 flex-shrink-0 bg-primary rounded-sm overflow-hidden">
                  <Image
                    src={product.image_url || ""}
                    alt={product.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                  {isPlaceholderImage(product.image_url) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-yellow-500/20">
                      <span className="text-[8px] text-yellow-400 font-bold uppercase">
                        Placeholder
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-grow min-w-0">
                  <h3 className="text-white font-medium truncate">
                    {product.name}
                  </h3>
                  <p className="text-white/50 text-sm">
                    {getCategoryName(product.category)}
                  </p>
                </div>

                {/* Placeholder Badge */}
                {isPlaceholderImage(product.image_url) && (
                  <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-sm">
                    Needs Image
                  </span>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    href={`/admin/dashboard/edit/${product.id}`}
                    className="bg-white/10 hover:bg-accent hover:text-primary text-white px-3 py-2 rounded-sm text-sm transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => setDeleteId(product.id)}
                    className="bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white px-3 py-2 rounded-sm text-sm transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-primary border border-white/20 rounded-sm p-6 max-w-md w-full">
            <h3 className="font-heading text-xl text-white mb-4">
              Delete Product?
            </h3>
            <p className="text-white/70 mb-6">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                disabled={isDeleting}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-sm transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={isDeleting}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
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
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
