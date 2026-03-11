import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | AL FAKHER SHISHA",
  description:
    "Learn about AL FAKHER SHISHA, your premier destination for premium shisha pipes, Al Fakher and Al Nakhla Moassal, and accessories in Glasgow, UK.",
  openGraph: {
    title: "About Us | AL FAKHER SHISHA",
    description:
      "Your premier destination for premium shisha in Glasgow, UK.",
  },
};

const services = [
  {
    title: "Premium Selection",
    description:
      "Carefully curated collection of the finest shisha products from trusted brands worldwide.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    title: "Expert Knowledge",
    description:
      "Our experienced team can guide you to the perfect products for your preferences.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Authentic Products",
    description:
      "We only stock genuine products from official distributors and manufacturers.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Customer Service",
    description:
      "Dedicated to providing excellent service and ensuring your complete satisfaction.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

const categories = [
  "Shisha Pipes",
  "Arab Traditional Shisha",
  "Al Fakher Moassal",
  "Al Nakhla Moassal",
  "320° Coconut Charcoal",
  "Shisha Glass & Vases",
  "Bowls & Heads",
  "Hoses, Tongs & Foil",
  "Disposable Vapes",
];

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      {/* Page Header */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center fade-up">
            <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">
              Who We Are
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              About Us
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-accent/50" />
              <div className="w-2 h-2 bg-accent rotate-45" />
              <div className="w-12 h-px bg-accent/50" />
            </div>
          </div>
        </div>
      </section>

      {/* Main About Section */}
      <section className="pb-20 lg:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Content */}
            <div className="fade-up">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
                Premium Shisha Experience in Glasgow
              </h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  Welcome to <span className="text-accent font-semibold">AL FAKHER SHISHA</span>,
                  your premier destination for authentic shisha experiences in
                  the heart of Glasgow. Located at 82 Centre Street in Kinning
                  Park, we have been serving shisha enthusiasts with the finest
                  products and exceptional service.
                </p>
                <p>
                  Our passion for shisha drives us to source only the highest
                  quality products from around the world. Whether you are a
                  seasoned enthusiast or new to the world of shisha, our
                  knowledgeable team is here to help you find the perfect
                  products for an exceptional experience.
                </p>
                <p>
                  We take pride in offering a carefully curated selection that
                  includes traditional Arab shisha pipes, premium Moassal from
                  renowned brands like Al Fakher and Al Nakhla, high-quality
                  coconut charcoal, and a wide range of accessories.
                </p>
              </div>
            </div>

            {/* Info Cards */}
            <div className="space-y-6 fade-up" style={{ animationDelay: "0.2s" }}>
              {/* Location Card */}
              <div className="bg-white/5 border border-white/10 rounded-sm p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-accent"
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
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-white mb-1">
                      Our Location
                    </h3>
                    <p className="text-white/70">
                      82 Centre St, Kinning Park
                      <br />
                      Glasgow, G5 8EE, UK
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours Card */}
              <div className="bg-white/5 border border-white/10 rounded-sm p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-accent"
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
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-white mb-1">
                      Opening Hours
                    </h3>
                    <p className="text-white/70">
                      Monday – Sunday
                      <br />
                      <span className="text-accent">11:00 AM – 11:30 PM</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-white/5 border border-white/10 rounded-sm p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-white mb-1">
                      Contact Us
                    </h3>
                    <p className="text-white/70">
                      <a
                        href="tel:07307116224"
                        className="hover:text-accent transition-colors"
                      >
                        07307 116224
                      </a>
                      <br />
                      <a
                        href="mailto:alfakhershisha59@gmail.com"
                        className="hover:text-accent transition-colors"
                      >
                        alfakhershisha59@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-transparent via-accent/5 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 fade-up">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Our Product Range
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              We offer a comprehensive selection of premium shisha products to
              meet all your needs.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-center hover:bg-accent/10 hover:border-accent/30 transition-all duration-300 fade-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="text-white/80 text-sm">{category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 fade-up">
            <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">
              Why Choose Us
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Quality & Service
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-px bg-accent/50" />
              <div className="w-2 h-2 bg-accent rotate-45" />
              <div className="w-12 h-px bg-accent/50" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/30 rounded-sm text-center transition-all duration-300 fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="font-heading text-lg font-semibold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-white/60 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent/5 border-y border-accent/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4 fade-up">
            Ready to Visit?
          </h2>
          <p
            className="text-white/70 mb-6 fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            We would love to welcome you to our store and help you discover the
            perfect shisha experience.
          </p>
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Link
              href="/contact"
              className="bg-accent hover:bg-accent-light text-primary font-semibold px-6 py-3 rounded-sm uppercase tracking-wider text-sm transition-all duration-300"
            >
              Contact Us
            </Link>
            <Link
              href="/products"
              className="border-2 border-accent text-accent hover:bg-accent hover:text-primary font-semibold px-6 py-3 rounded-sm uppercase tracking-wider text-sm transition-all duration-300"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
