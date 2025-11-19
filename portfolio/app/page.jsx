import Home from "@/components/Home";
import { detectPreferredLanguage } from "@/lib/detectLanguage";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export default function Page() {
  const language = detectPreferredLanguage();
  return <Home initialLanguage={language} />;
}
