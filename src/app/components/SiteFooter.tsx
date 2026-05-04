import Link from "next/link";

type SiteFooterProps = {
  lang: "fr" | "en";
  className?: string;
};

export default function SiteFooter({ lang, className = "" }: SiteFooterProps) {
  const t =
    lang === "fr"
      ? {
          about: "À propos",
          contact: "Contact",
          legal: "Mentions légales",
          email: "hello@nowperfume.fr",
          instagram: "@now.perfume",
        }
      : {
          about: "About",
          contact: "Contact",
          legal: "Legal notice",
          email: "hello@nowperfume.fr",
          instagram: "@now.perfume",
        };

  return (
    <footer className={`border-t border-black/15 pt-6 pb-5 text-black md:flex md:items-center md:justify-between md:pt-6 md:pb-3 ${className}`}>
      <div className="flex items-start justify-between px-1 text-[11px] uppercase tracking-[0.13em] md:hidden">
        {/* Left column */}
        <div className="flex flex-col gap-[10px] text-black/65">
          <Link href="/la-marque" className="transition hover:opacity-60">
            {t.about}
          </Link>
          <Link href="/mentions-legales" className="transition hover:opacity-60">
            {t.legal}
          </Link>
          <Link href="/nous-trouver" className="transition hover:opacity-60">
            {t.contact}
          </Link>
        </div>

        {/* Right column */}
        <div className="flex flex-col items-end gap-[10px] text-black/50">
          <a href={`mailto:${t.email}`} className="normal-case tracking-[0.02em] transition hover:opacity-60">
            {t.email}
          </a>
          <a
            href="https://instagram.com/now.perfume"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 normal-case tracking-[0.02em] transition hover:opacity-60"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
            <span>{t.instagram}</span>
          </a>
        </div>
      </div>

      <div className="hidden md:flex md:flex-row md:items-center md:gap-10">
        <div className="md:flex md:flex-wrap md:items-center md:gap-8 md:text-sm text-black/75">
          <Link href="/la-marque" className="transition hover:opacity-60">
            {t.about}
          </Link>
          <Link href="/nous-trouver" className="transition hover:opacity-60">
            {t.contact}
          </Link>
          <Link href="/mentions-legales" className="transition hover:opacity-60">
            {t.legal}
          </Link>
        </div>

        <div className="md:flex md:items-center md:gap-8 md:text-sm text-black/55">
          <a href={`mailto:${t.email}`} className="transition hover:opacity-60">
            {t.email}
          </a>

          <a
            href="https://instagram.com/now.perfume"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition hover:opacity-60"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
            <span>{t.instagram}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
