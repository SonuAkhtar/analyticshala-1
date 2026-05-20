import type { Metadata } from "next";
import Script from "next/script";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "AnalyticShala - India's Most Hands-On Data Education",
  description:
    "Industry-led courses in Data Analytics, Data Science, AI & Web Development. Weekend batches, real projects, 1:1 mentorship, and placement support.",
  keywords:
    "data analytics, data science, AI, machine learning, SQL, Python, Excel, Tableau, courses, India, Gurgaon",
  authors: [{ name: "AnalyticShala" }],
  openGraph: {
    title: "AnalyticShala - Where Data Careers Are Built",
    description:
      "Industry-led courses in Data Analytics, Data Science, AI & Web Development. Join 300+ learners.",
    siteName: "AnalyticShala",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
      </head>
      <body>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
