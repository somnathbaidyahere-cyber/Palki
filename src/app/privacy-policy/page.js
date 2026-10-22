import LegalPage from "@/components/LegalPage";
import { PRIVACY } from "@/data/legal";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Read how Palki Garden handles personal information shared through its website and enquiry channels.",
  alternates: {
    canonical: "/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return <LegalPage {...PRIVACY} />;
}
