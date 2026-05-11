import type { Metadata } from "next";
import FragranceExperience from "./FragranceExperience";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "NOW Perfume — Find Your Energy",
};

export default function FragrancePage() {
  return <FragranceExperience />;
}
