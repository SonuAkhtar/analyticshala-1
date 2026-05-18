import type { Metadata } from "next";
import { workshopData } from "@/data/appData";
import WorkshopDetailsClient from "./WorkshopDetailsClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const workshop =
    workshopData.upcoming.find(
      (w) => w.slug === slug || String(w.id) === slug,
    ) || workshopData.upcoming[0];

  return {
    title: `${workshop.title} | AnalyticShala Workshops`,
    description: `${workshop.title} — ${workshop.date}. ${(workshop.desc ?? "").slice(0, 150)}`,
    openGraph: {
      title: `${workshop.title} | AnalyticShala`,
      description: (workshop.desc ?? "").slice(0, 160),
      type: "website",
      url: `https://analyticshala.in/workshops/${workshop.slug ?? workshop.id}`,
    },
    alternates: {
      canonical: `https://analyticshala.in/workshops/${workshop.slug ?? workshop.id}`,
    },
  };
}

export function generateStaticParams() {
  return workshopData.upcoming.map((w) => ({ slug: w.slug ?? String(w.id) }));
}

export default async function WorkshopDetailsPage({ params }: Props) {
  const { slug } = await params;
  return <WorkshopDetailsClient slug={slug} />;
}
