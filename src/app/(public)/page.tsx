import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  title: "AnalyticShala — India's Most Hands-On Data Education",
  description:
    "Industry-led courses in Data Analytics, Data Science, AI & Web Development. Weekend batches, real projects, 1:1 mentorship, and placement support.",
};

export default function HomePage() {
  return <HomePageClient />;
}
