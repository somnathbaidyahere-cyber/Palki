import LegalPage from "@/components/LegalPage";
import { TERMS } from "@/data/legal";

export const metadata = {
  title: "Terms & Conditions",
  description:
    "Review the terms governing use of the Palki Garden website and its enquiry services.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return <LegalPage {...TERMS} />;
}
