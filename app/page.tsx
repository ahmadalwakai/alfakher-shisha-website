import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Link from "next/link";
import Image from "next/image";

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "500+", label: "Products" },
  { value: "1000+", label: "Happy Customers" },
  { value: "7", label: "Days Open" },
];

const categories = [
  {
    title: "Shisha Pipes",
    description: "Premium quality pipes for the ultimate experience",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "Al Fakher Moassal",
    description: "Authentic flavors for discerning enthusiasts",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    title: "Premium Charcoal",
    description: "320° coconut charcoal for perfect heat",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ),
  },
  {
    title: "Accessories",
    description: "Everything you need for the perfect session",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Bar */}
      <section className="bg-accent/10 border-y border-accent/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="font-heading text-3xl md:text-4xl font-bold text-accent mb-1">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 fade-up">
            <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">
              What We Offer
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              Our Categories
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-px bg-accent/50" />
              <div className="w-2 h-2 bg-accent rotate-45" />
              <div className="w-12 h-px bg-accent/50" />
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group p-8 bg-white/5 hover:bg-white/10 rounded-sm border border-white/10 hover:border-accent/30 transition-all duration-300 text-center fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="font-heading text-xl font-semibold text-white mb-3 group-hover:text-accent transition-colors">
                  {category.title}
                </h3>
                <p className="text-white/60 text-sm">
                  {category.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12 fade-up">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-light font-medium uppercase tracking-wider text-sm transition-colors group"
            >
              View All Products
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-transparent via-accent/5 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="fade-up">
              <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">
                About Us
              </p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
                Premium Shisha Experience
              </h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  Welcome to AL FAKHER SHISHA, your premier destination for
                  authentic shisha experiences in Glasgow. Located in the heart
                  of Kinning Park, we bring you the finest selection of shisha
                  pipes, premium Moassal flavors, and quality accessories.
                </p>
                <p>
                  Our carefully curated collection includes traditional Arab
                  shisha pipes, renowned Al Fakher and Al Nakhla Moassal, premium
                  320° coconut charcoal, and all the accessories you need for
                  the perfect session.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-primary font-semibold px-6 py-3 rounded-sm uppercase tracking-wider text-sm transition-all duration-300 group"
                >
                  Learn More
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="aspect-[4/3] rounded-sm overflow-hidden border border-white/10 relative">
                <Image
                  src="/images/about.png"
                  alt="AL FAKHER SHISHA shop interior showcasing premium shisha pipes and accessories"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                {/* Subtle overlay for luxury feel */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
              </div>
              {/* Decorative Element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-accent/30 rounded-sm -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 border border-accent/30 rounded-sm p-8 md:p-12 lg:p-16 text-center fade-up">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Visit Us Today
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
              Experience the finest shisha selection in Glasgow. We are open 7
              days a week to serve you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="bg-accent hover:bg-accent-light text-primary font-semibold px-8 py-4 rounded-sm uppercase tracking-wider text-sm transition-all duration-300"
              >
                Get Directions
              </Link>
              <a
                href="tel:07307116224"
                className="border-2 border-accent text-accent hover:bg-accent hover:text-primary font-semibold px-8 py-4 rounded-sm uppercase tracking-wider text-sm transition-all duration-300"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
