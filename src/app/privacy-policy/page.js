import LegalPage from "@/components/LegalPage";
import { PRIVACY } from "@/data/legal";

export const metadata = {
  title: "Privacy Policy | Palki",
  description: "How Palki Garden collects, uses and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return <LegalPage {...PRIVACY} />;
}
