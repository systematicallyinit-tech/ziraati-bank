import localFont from "next/font/local";
import Providers from "./providers";
import LiveChat from "./components/LiveChat";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const viewport = {
  themeColor: "#e30613",
}

export const metadata = {
  title: "Ziraat Bankası | Bir Bankadan Daha Fazlası",
  description:
    "Bankacılık ürünleri ve hizmetleri hakkında bilgi verebiliriz. Kredi koşullarını hesaplayabilir ve başvurunuzu işleme koyabiliriz. Ayrıca mevduat getirilerini de hesaplayabiliriz.",
  keywords:
    "Internet Banking, Commercial, Individual, Institutional, Loan Interest Rate",
  authors: [{ name: "Ziraat Bank", url: "https://ziraati-bank.vercel.app" }],
  creator: "Ziraat Bank",
  openGraph: {
    title: "Ziraat Bank",
    description: "Bankacılık ürünleri ve hizmetleri hakkında bilgi verebiliriz. Kredi koşullarını hesaplayabilir ve başvurunuzu işleme koyabiliriz. Ayrıca mevduat getirilerini de hesaplayabiliriz.",
    url: "https://ziraati-bank.vercel.app",
    siteName: "Ziraat Bank",
    images: [
      {
        url: "https://ziraati-bank.vercel.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ziraat Bank",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ziraat Bank",
    description: "Bankacılık ürünleri ve hizmetleri hakkında bilgi verebiliriz. Kredi koşullarını hesaplayabilir ve başvurunuzu işleme koyabiliriz. Ayrıca mevduat getirilerini de hesaplayabiliriz.",
    images: ["https://ziraati-bank.vercel.app/images/og-image.png"],
    creator: "@ziraatibankasi",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/shortcut-icon.png",
  },
  themeColor: "#e30613",
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    noindex: false,
    nofollow: false,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  appleWebApp: {
    capable: true,
    title: "Ziraat Bank",
    statusBarStyle: "default",
  },
  mobileWebApp: {
    capable: true,
    title: "Ziraat Bank",
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  theme: {
    colorScheme: "light dark",
    color: "#ffffff",
  },
  manifestType: "application/manifest+json",
  applicationName: "Ziraat Bank",
  category: "Finance",
  publisher: "Ziraat Bank",
  publisherWebsite: "https://ziraati-bank.vercel.app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`bg-white w-full h-full text-black min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
        <LiveChat />
      </body>
    </html>
  );
}
