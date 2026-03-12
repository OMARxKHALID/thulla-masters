import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://thullamasters.com"),
  title: {
    default: "Thulla Masters | Challenge Your Skills",
    template: "%s | Thulla Masters",
  },
  description:
    "Thulla Masters: The ultimate digital arena for the classic Thulla card game. Avoid being the Bhabhi and show off your card mastery in this exciting online multiplayer game.",
  keywords: [
    "Thulla",
    "Bhabhi card game",
    "Indian rummy",
    "South asian card games",
    "online multiplayer card game",
    "Thulla Masters",
    "get away card game",
  ],
  authors: [{ name: "Thulla Masters" }],
  creator: "Thulla Masters Team",
  publisher: "Thulla Masters",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Thulla Masters | Challenge Your Skills",
    description: "The ultimate digital arena for the classic Thulla card game. Show off your mastery!",
    url: "https://thullamasters.com",
    siteName: "Thulla Masters",
    images: [
      {
        url: "/ui/Background.png",
        width: 1200,
        height: 630,
        alt: "Thulla Masters - The Digital Arena",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thulla Masters | Challenge Your Skills",
    description: "The ultimate digital arena for the classic Thulla card game. Avoid being the Bhabhi and show off your card mastery.",
    creator: "@thullamasters",
    images: ["/ui/Background.png"],
  },
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
  icons: {
    icon: "/ui/logo.png",
    apple: "/apple-icon.png",
  },
  alternates: {
    canonical: "https://thullamasters.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Thulla Masters",
  "description": "The ultimate digital arena for the classic Thulla card game. Avoid being the Bhabhi and show off your card mastery.",
  "genre": "Card Game",
  "playMode": "Multiplayer",
  "applicationCategory": "Game",
  "operatingSystem": "Android",
  "url": "https://thullamasters.com",
  "image": "https://thullamasters.com/opengraph-image.png",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
