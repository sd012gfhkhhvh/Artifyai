import type { Metadata } from "next";

import { UseCasePage } from "@/components/solutions/UseCasePage";
import { useCaseContent } from "@/lib/usecase-content";

const content = useCaseContent.ecommerce;

export const metadata: Metadata = {
  title: content.pageTitle,
  description: content.metaDescription,
};

export default function EcommercePage() {
  return <UseCasePage content={content} />;
}
