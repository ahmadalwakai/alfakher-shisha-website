import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductsGrid from "@/components/ProductsGrid";
import { getProducts } from "@/lib/db";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | AL FAKHER SHISHA",
  description:
    "Explore our premium collection of shisha pipes, Al Fakher Moassal, Al Nakhla Moassal, charcoal, glass vases, bowls, and accessories.",
  openGraph: {
    title: "Products | AL FAKHER SHISHA",
    description:
      "Explore our premium collection of shisha pipes and accessories.",
  },
};

// Revalidate every 60 seconds to pick up changes from admin
export const revalidate = 60;

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <main>
      <Navbar />

      {/* Page Header */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center fade-up">
            <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">
              Our Collection
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Products
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-accent/50" />
              <div className="w-2 h-2 bg-accent rotate-45" />
              <div className="w-12 h-px bg-accent/50" />
            </div>
            <p className="text-white/70 max-w-2xl mx-auto">
              Discover our carefully curated selection of premium shisha
              products. From traditional pipes to premium flavors and
              accessories, we have everything you need for the perfect
              experience.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="pb-20 lg:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ProductsGrid products={products} />
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-accent/5 border-y border-accent/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="fade-up">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-white mb-2">
                Quality Assured
              </h3>
              <p className="text-white/60 text-sm">
                All products are authentic and sourced from trusted suppliers
              </p>
            </div>

            <div className="fade-up" style={{ animationDelay: "0.1s" }}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-white mb-2">
                Visit Our Store
              </h3>
              <p className="text-white/60 text-sm">
                82 Centre St, Kinning Park, Glasgow, G5 8EE
              </p>
            </div>

            <div className="fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-white mb-2">
                Open Daily
              </h3>
              <p className="text-white/60 text-sm">
                Monday – Sunday, 11:00 AM – 11:30 PM
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
