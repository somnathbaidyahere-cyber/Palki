import LegalPage from "@/components/LegalPage";
import { TERMS } from "@/data/legal";

export const metadata = {
  title: "Terms & Conditions | Palki",
  description: "Terms governing use of the Palki Garden website and event enquiries.",
};

export default function TermsPage() {
  return <LegalPage {...TERMS} />;
}
