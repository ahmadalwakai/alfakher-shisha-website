"use client";

import { useState } from "react";
import Image from "next/image";
import { Product, PRODUCT_CATEGORIES, isPlaceholderImage } from "@/lib/db";

const categories = [
  { id: "all", name: "All Products" },
  ...PRODUCT_CATEGORIES,
];

interface ProductsGridProps {
  products: Product[];
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || categoryId;
  };

  return (
    <div>
      {/* Category Tabs */}
      <div className="mb-12 overflow-x-auto">
        <div className="flex flex-wrap justify-center gap-2 min-w-max px-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-sm text-sm font-medium uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                activeCategory === category.id
                  ? "bg-accent text-primary"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <article
            key={product.id}
            className="group bg-white/5 rounded-sm overflow-hidden hover:bg-white/10 transition-all duration-300 fade-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-primary/50">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized={isPlaceholderImage(product.image_url)}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/20 to-primary">
                  <svg
                    className="w-16 h-16 text-accent/30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-accent/90 text-primary text-xs font-medium px-2 py-1 rounded-sm uppercase tracking-wider">
                  {getCategoryName(product.category)}
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-5">
              <h3 className="font-heading text-xl font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                {product.name}
              </h3>
            </div>
          </article>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <svg
            className="w-16 h-16 mx-auto text-accent/30 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p className="text-white/60">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
