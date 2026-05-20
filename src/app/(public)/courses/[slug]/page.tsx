import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { courseListData } from "@/data/appData";
import CourseDetailsClient from "./CourseDetailsClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return courseListData.map((c) => ({ slug: c.slug || c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = courseListData.find((c) => c.slug === slug || c.id === slug);
  if (!course) return { title: "Course Not Found | AnalyticShala" };

  return {
    title: `${course.title} | AnalyticShala`,
    description: `${course.title} - ${course.subtitle}. ${course.description.slice(0, 150)}`,
    openGraph: {
      title: `${course.title} | AnalyticShala`,
      description: course.description.slice(0, 160),
      type: "website",
      url: `https://analyticshala.in/courses/${course.slug || course.id}`,
    },
    alternates: {
      canonical: `https://analyticshala.in/courses/${course.slug || course.id}`,
    },
  };
}

export default async function CourseDetailsPage({ params }: Props) {
  const { slug } = await params;
  const course = courseListData.find((c) => c.slug === slug || c.id === slug);
  if (!course) notFound();

  return <CourseDetailsClient course={course} />;
}
