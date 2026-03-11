import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | AL FAKHER SHISHA",
  description:
    "Get in touch with AL FAKHER SHISHA. Visit us at 82 Centre St, Kinning Park, Glasgow or call 07307 116224. Open Monday-Sunday, 11AM-11:30PM.",
  openGraph: {
    title: "Contact Us | AL FAKHER SHISHA",
    description:
      "Get in touch with AL FAKHER SHISHA in Glasgow.",
  },
};

export default function ContactPage() {
  return (
    <main>
      <Navbar />

      {/* Page Header */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center fade-up">
            <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">
              Get In Touch
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Contact Us
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-accent/50" />
              <div className="w-2 h-2 bg-accent rotate-45" />
              <div className="w-12 h-px bg-accent/50" />
            </div>
            <p className="text-white/70 max-w-2xl mx-auto">
              Have a question or want to learn more about our products? We would
              love to hear from you. Reach out using the form below or visit us
              in store.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-20 lg:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info & Map */}
            <div className="order-2 lg:order-1 space-y-8">
              {/* Contact Details */}
              <div className="fade-up">
                <h2 className="font-heading text-2xl font-bold text-white mb-6">
                  Visit Our Store
                </h2>
                <div className="space-y-4">
                  {/* Address */}
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
                      <h3 className="font-semibold text-white mb-1">Address</h3>
                      <p className="text-white/70">
                        82 Centre St, Kinning Park
                        <br />
                        Glasgow, G5 8EE, UK
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
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
                      <h3 className="font-semibold text-white mb-1">
                        Phone / WhatsApp
                      </h3>
                      <a
                        href="tel:07307116224"
                        className="text-white/70 hover:text-accent transition-colors"
                      >
                        07307 116224
                      </a>
                    </div>
                  </div>

                  {/* Email */}
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
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Email</h3>
                      <a
                        href="mailto:alfakhershisha59@gmail.com"
                        className="text-white/70 hover:text-accent transition-colors"
                      >
                        alfakhershisha59@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
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
                      <h3 className="font-semibold text-white mb-1">
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
              </div>

              {/* Map */}
              <div className="fade-up" style={{ animationDelay: "0.2s" }}>
                <h2 className="font-heading text-2xl font-bold text-white mb-6">
                  Find Us
                </h2>
                <div className="aspect-video rounded-sm overflow-hidden border border-white/10">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2240.123456789!2d-4.2809!3d55.8518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x488846a03c67c5cd%3A0x0!2s82%20Centre%20St%2C%20Kinning%20Park%2C%20Glasgow%20G5%208EE!5e0!3m2!1sen!2suk!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="AL FAKHER SHISHA Location"
                  />
                </div>
                <a
                  href="https://maps.google.com/?q=82+Centre+St,+Kinning+Park,+Glasgow,+G5+8EE,+UK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:text-accent-light mt-4 text-sm transition-colors"
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Open in Google Maps
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="order-1 lg:order-2 fade-up" style={{ animationDelay: "0.1s" }}>
              <div className="bg-white/5 border border-white/10 rounded-sm p-6 md:p-8">
                <h2 className="font-heading text-2xl font-bold text-white mb-2">
                  Send Us a Message
                </h2>
                <p className="text-white/60 mb-6 text-sm">
                  Fill out the form below and we will get back to you as soon as
                  possible.
                </p>
                <ContactForm />
              </div>

              {/* WhatsApp CTA */}
              <div className="mt-6 bg-green-600/10 border border-green-600/30 rounded-sm p-6 text-center">
                <p className="text-white/70 mb-4 text-sm">
                  Prefer to chat? Message us directly on WhatsApp for quick
                  responses.
                </p>
                <a
                  href="https://wa.me/447307116224"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-sm font-medium transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
