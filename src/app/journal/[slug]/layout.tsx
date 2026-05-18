import type { Metadata } from "next";
import { getArticleBySlug, ARTICLES } from "@/data/journal";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return { title: "Article — NOW Perfume" };
  }
  return {
    title: `${article.title.fr} — NOW Journal`,
    description: article.excerpt.fr,
    openGraph: {
      title: article.title.fr,
      description: article.excerpt.fr,
      images: [{ url: article.heroImage }],
      type: "article",
    },
  };
}

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
