import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal — NOW Perfume",
  description:
    "Thoughts on fragrance, atmosphere, and emotional culture. Discover articles on immersive scent experiences, the science of emotion, and the future of perfumery.",
  openGraph: {
    title: "Journal — NOW Perfume",
    description:
      "Thoughts on fragrance, atmosphere, and emotional culture.",
    images: [{ url: "/images/brand-hero.jpg" }],
    type: "website",
  },
};

export default function JournalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
