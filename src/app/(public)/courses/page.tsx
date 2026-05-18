import type { Metadata } from "next";
import CoursesClient from "./CoursesClient";

export const metadata: Metadata = {
  title: "Explore Data Courses | AnalyticShala",
  description:
    "Explore hands-on courses in Data Analytics, Data Science, AI, Machine Learning, SQL, and more. Industry-led curriculum with real projects and job-ready outcomes.",
  openGraph: {
    title: "Explore Data Courses | AnalyticShala",
    description:
      "From beginner to advanced — find the right data & AI course for your career goals. 300+ learners trained. 4.9★ rated.",
    type: "website",
    url: "https://analyticshala.in/courses",
  },
  alternates: {
    canonical: "https://analyticshala.in/courses",
  },
};

export default function CoursesPage() {
  return <CoursesClient />;
}
