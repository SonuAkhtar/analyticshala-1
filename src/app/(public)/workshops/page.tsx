import type { Metadata } from "next";
import WorkshopsClient from "./WorkshopsClient";

export const metadata: Metadata = {
  title: "Live Workshops & Bootcamps | AnalyticShala",
  description:
    "Join live weekend workshops in Data Analytics, Python, SQL, Power BI & AI. Small batches, real projects, industry experts. Register for upcoming bootcamps.",
  openGraph: {
    title: "Live Workshops & Bootcamps | AnalyticShala",
    description:
      "Hands-on workshops led by industry professionals. Small batches. Real projects. Job-ready results. Upcoming sessions filling fast.",
    type: "website",
    url: "https://analyticshala.in/workshops",
  },
  alternates: {
    canonical: "https://analyticshala.in/workshops",
  },
};

export default function WorkshopsPage() {
  return <WorkshopsClient />;
}
