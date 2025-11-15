import type { Metadata } from "next";

import { UseCasePage } from "@/components/solutions/UseCasePage";
import { useCaseContent } from "@/lib/usecase-content";

const content = useCaseContent.photography;

export const metadata: Metadata = {
  title: content.pageTitle,
  description: content.metaDescription,
};

export default function PhotographyPage() {
  return <UseCasePage content={content} />;
}
