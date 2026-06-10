import type { Metadata } from "next";
import NowView from "@/components/now/NowView";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vankudre.com";

export const metadata: Metadata = {
  title: "Now",
  description:
    "A snapshot of what Harshal Vankudre is focused on right now — building, learning, reading.",
  alternates: { canonical: "/now" },
  openGraph: {
    title: "Now | Harshal Vankudre",
    description:
      "A snapshot of what Harshal Vankudre is focused on right now — building, learning, reading.",
    url: `${SITE_URL}/now`,
    type: "website",
  },
};

export default function NowPage() {
  return <NowView />;
}
