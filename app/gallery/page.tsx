import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryGrid from "@/components/GalleryGrid";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "Gallery | AL FAKHER SHISHA",
  description:
    "Browse our gallery showcasing premium shisha pipes, accessories, and products available at AL FAKHER SHISHA in Glasgow.",
  openGraph: {
    title: "Gallery | AL FAKHER SHISHA",
    description:
      "Browse our gallery showcasing premium shisha pipes and accessories.",
  },
};

interface GalleryImage {
  src: string;
  alt: string;
}

async function getGalleryImages(): Promise<GalleryImage[]> {
  const imagesDirectory = path.join(process.cwd(), "public/images");

  try {
    // Check if directory exists
    if (!fs.existsSync(imagesDirectory)) {
      return [];
    }

    const files = fs.readdirSync(imagesDirectory);
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"];

    const images = files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return imageExtensions.includes(ext);
      })
      .map((file, index) => ({
        src: `/images/${file}`,
        alt: `Gallery image ${index + 1} - AL FAKHER SHISHA`,
      }));

    return images;
  } catch (error) {
    console.error("Error reading gallery images:", error);
    return [];
  }
}

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <main>
      <Navbar />

      {/* Page Header */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center fade-up">
            <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">
              Our Showcase
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Gallery
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-accent/50" />
              <div className="w-2 h-2 bg-accent rotate-45" />
              <div className="w-12 h-px bg-accent/50" />
            </div>
            <p className="text-white/70 max-w-2xl mx-auto">
              Take a visual tour of our premium shisha collection. Click on any
              image to view it in full size.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="pb-20 lg:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryGrid images={images} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent/5 border-y border-accent/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4 fade-up">
            Want to See More?
          </h2>
          <p className="text-white/70 mb-6 fade-up" style={{ animationDelay: "0.1s" }}>
            Visit our store in Kinning Park to explore our full collection in person.
          </p>
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <a
              href="https://maps.google.com/?q=82+Centre+St,+Kinning+Park,+Glasgow,+G5+8EE,+UK"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent hover:bg-accent-light text-primary font-semibold px-6 py-3 rounded-sm uppercase tracking-wider text-sm transition-all duration-300"
            >
              Get Directions
            </a>
            <a
              href="tel:07307116224"
              className="border-2 border-accent text-accent hover:bg-accent hover:text-primary font-semibold px-6 py-3 rounded-sm uppercase tracking-wider text-sm transition-all duration-300"
            >
              Call Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
