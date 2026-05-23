import type { Metadata } from "next";
import TestimonyPageClient from "./TestimonyPageClient";

export const metadata: Metadata = {
  title: "Student Testimonials | AnalyticShala",
  description:
    "Read what 300+ students say about AnalyticShala. Real reviews from data professionals who transformed their careers with our courses and workshops.",
  openGraph: {
    title: "Student Testimonials | AnalyticShala",
    description:
      "Over 300 professionals have transformed their careers with AnalyticShala. Here's what they have to say.",
    type: "website",
    url: "https://analyticshala.in/testimony",
  },
  alternates: {
    canonical: "https://analyticshala.in/testimony",
  },
};

export default function TestimonyPage() {
  return <TestimonyPageClient />;
}
