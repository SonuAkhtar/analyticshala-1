import type { Metadata } from "next";
import AboutUsClient from "./AboutUsClient";

export const metadata: Metadata = {
  title: "About Us | AnalyticShala",
  description:
    "AnalyticShala is a Gurgaon-based data education company empowering India's data professionals. 11+ years, 300+ students trained, 4.9★ rated.",
  openGraph: {
    title: "About Us | AnalyticShala",
    description:
      "Learn about our mission, values, team, and why 300+ professionals chose AnalyticShala to transform their data careers.",
    type: "website",
    url: "https://analyticshala.in/aboutUs",
  },
  alternates: {
    canonical: "https://analyticshala.in/aboutUs",
  },
};

export default function AboutUsPage() {
  return <AboutUsClient />;
}
