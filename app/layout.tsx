import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import GoogleAnalytics from "./google-analytics";
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Wild Coast Tours | Authentic Eco-Tourism Experiences in Pondoland",
  description:
    "Discover the breathtaking beauty of Pondoland with Wild Coast Tours. Our sustainable eco-tours showcase stunning landscapes, vibrant Mpondo culture, and environmental conservation efforts. Book your authentic South African adventure today.",
  keywords: [
    "Wild Coast Tours",
    "Pondoland eco-tourism",
    "South Africa tours",
    "Mpondo culture",
    "sustainable tourism",
    "environmental activism",
    "Xolobeni",
    "Amadiba Crisis Committee",
    "eco-friendly travel",
    "Wild Coast hiking",
    "cultural tours South Africa",
    "responsible tourism",
    "indigenous tourism",
    "South African adventure",
  ],
  authors: [{ name: "Wild Coast Tours" }],
  creator: "Wild Coast Tours",
  publisher: "Wild Coast Tours",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://wildcoasttours.vercel.app"),
  alternates: {
    canonical: "https://wildcoasttours.vercel.app",
  },
  openGraph: {
    title: "Wild Coast Tours | Authentic Eco-Tourism in Pondoland",
    description:
      "Discover the breathtaking beauty of Pondoland with Wild Coast Tours. Our sustainable eco-tours showcase stunning landscapes, vibrant Mpondo culture, and environmental conservation efforts.",
    url: "https://wildcoasttours.vercel.app",
    siteName: "Wild Coast Tours",
    images: [
      {
        url: "/placeholder.svg?height=630&width=1200&text=Wild+Coast+Pondoland+Tours",
        width: 1200,
        height: 630,
        alt: "Wild Coast Pondoland - Stunning landscapes and pristine beaches for eco-tours",
      },
      {
        url: "/images/sinegugu-portrait.png", // Keeping this image as it's used in the About section
        width: 1200,
        height: 630,
        alt: "Sinegugu Zukulu - Guide and Environmental Activist for Wild Coast Tours",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wild Coast Tours | Eco-Tourism in Pondoland",
    description:
      "Experience authentic Pondoland eco-tours. Sustainable tourism supporting Mpondo communities and Wild Coast conservation.",
    images: ["/placeholder.svg?height=630&width=1200&text=Wild+Coast+Pondoland+Tours"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "travel",
  other: {
    "geo.region": "ZA-EC",
    "geo.placename": "Pondoland, Eastern Cape, South Africa",
    "geo.position": "-31.0218;29.8739",
    ICBM: "-31.0218, 29.8739",
    "theme-color": "#1B5F8C",
    "msapplication-TileColor": "#1B5F8C",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Wild Coast Tours",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scrollbar-hide">
      <head>
        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "TouristAttraction",
                  "@id": "https://wildcoasttours.vercel.app/#attraction",
                  name: "Wild Coast Tours",
                  description: "Authentic eco-tourism experiences in Pondoland, South Africa",
                  url: "https://wildcoasttours.vercel.app",
                  image: [
                    "https://wildcoasttours.vercel.app/placeholder.svg?height=630&width=1200&text=Wild+Coast+Pondoland+Tours",
                  ],
                  address: {
                    "@type": "PostalAddress",
                    addressRegion: "Eastern Cape",
                    addressCountry: "ZA",
                    addressLocality: "Pondoland",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: -31.0218,
                    longitude: 29.8739,
                  },
                  touristType: ["EcoTourist", "CulturalTourist", "AdventureTourist"],
                  availableLanguage: ["en", "zu", "xh"],
                },
                {
                  "@type": "TourOperator",
                  "@id": "https://wildcoasttours.vercel.app/#business",
                  name: "Wild Coast Tours",
                  description: "Sustainable eco-tourism operator in Pondoland, South Africa",
                  url: "https://wildcoasttours.vercel.app",
                  logo: "https://wildcoasttours.vercel.app/placeholder.svg?height=60&width=200&text=Wild+Coast+Tours+Logo",
                  image:
                    "https://wildcoasttours.vercel.app/placeholder.svg?height=630&width=1200&text=Wild+Coast+Pondoland+Tours",
                  address: {
                    "@type": "PostalAddress",
                    addressRegion: "Eastern Cape",
                    addressCountry: "ZA",
                    addressLocality: "Pondoland",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: -31.0218,
                    longitude: 29.8739,
                  },
                  areaServed: {
                    "@type": "Place",
                    name: "Wild Coast, Pondoland, Eastern Cape, South Africa",
                  },
                  serviceType: "Eco-Tourism",
                  priceRange: "$$",
                  paymentAccepted: ["Cash", "Credit Card", "Bank Transfer"],
                  currenciesAccepted: "ZAR",
                },
                {
                  "@type": "WebSite",
                  "@id": "https://wildcoasttours.vercel.app/#website",
                  url: "https://wildcoasttours.vercel.app",
                  name: "Wild Coast Tours",
                  description: "Authentic eco-tourism experiences in Pondoland, South Africa",
                  publisher: {
                    "@id": "https://wildcoasttours.vercel.app/#business",
                  },
                  potentialAction: [
                    {
                      "@type": "SearchAction",
                      target: {
                        "@type": "EntryPoint",
                        urlTemplate: "https://wildcoasttours.vercel.app/?s={search_term_string}",
                      },
                      "query-input": "required name=search_term_string",
                    },
                  ],
                },
              ],
            }),
          }}
        />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Additional meta tags that might not be covered by Next.js metadata API */}
        <meta name="language" content="English" />
        <meta name="geo.region" content="ZA-EC" />
        <meta name="geo.placename" content="Pondoland" />
        <meta name="geo.position" content="-31.0218;29.8739" />
        <meta name="ICBM" content="-31.0218, 29.8739" />
        <meta name="rating" content="5" />
        <meta name="distribution" content="global" />
        <meta name="revisit-after" content="7 days" />
        <meta name="expires" content="never" />

        {/* Business Information */}
        <meta name="classification" content="Tourism, Environmental Conservation, Cultural Heritage" />
        <meta name="coverage" content="Pondoland, Wild Coast, Eastern Cape, South Africa" />
        <meta name="subject" content="Eco-tourism, Environmental Conservation, Mpondo Culture, Wild Coast" />
        <GoogleAnalytics />
        
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
