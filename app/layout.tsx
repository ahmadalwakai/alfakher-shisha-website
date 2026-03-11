import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "AL FAKHER SHISHA | Premium Shisha Shop in Glasgow",
  description:
    "AL FAKHER SHISHA - Your premier destination for authentic shisha pipes, Al Fakher Moassal, Al Nakhla Moassal, premium charcoal, and accessories in Glasgow, UK. Visit us at 82 Centre St, Kinning Park.",
  keywords: [
    "shisha",
    "hookah",
    "Al Fakher",
    "Al Nakhla",
    "Moassal",
    "shisha pipes",
    "Glasgow shisha",
    "Kinning Park",
    "premium shisha",
    "coconut charcoal",
    "shisha accessories",
    "Arab shisha",
    "traditional shisha",
  ],
  authors: [{ name: "AL FAKHER SHISHA" }],
  creator: "AL FAKHER SHISHA",
  publisher: "AL FAKHER SHISHA",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://alfakhershisha.co.uk",
    siteName: "AL FAKHER SHISHA",
    title: "AL FAKHER SHISHA | Premium Shisha Shop in Glasgow",
    description:
      "Your premier destination for authentic shisha pipes, premium Moassal, and accessories in Glasgow, UK.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AL FAKHER SHISHA - Premium Shisha Shop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AL FAKHER SHISHA | Premium Shisha Shop in Glasgow",
    description:
      "Your premier destination for authentic shisha pipes, premium Moassal, and accessories in Glasgow, UK.",
    images: ["/images/og-image.jpg"],
  },
  metadataBase: new URL("https://alfakhershisha.co.uk"),
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "AL FAKHER SHISHA",
  image: "https://alfakhershisha.co.uk/images/og-image.jpg",
  "@id": "https://alfakhershisha.co.uk",
  url: "https://alfakhershisha.co.uk",
  telephone: "07307 116224",
  email: "alfakhershisha59@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "82 Centre St",
    addressLocality: "Kinning Park, Glasgow",
    postalCode: "G5 8EE",
    addressCountry: "UK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 55.8518,
    longitude: -4.2809,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "11:00",
      closes: "23:30",
    },
  ],
  priceRange: "££",
  description:
    "Premium shisha pipes, Al Fakher and Al Nakhla Moassal, coconut charcoal, and accessories in Glasgow.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body bg-primary text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
