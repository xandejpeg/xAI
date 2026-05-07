"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// @react-pdf/renderer must be loaded client-side only
const PDFDownloadLinkDynamic = dynamic(
  () => import("./relatorio-pdf-inner").then((m) => ({ default: m.PDFButton })),
  { ssr: false, loading: () => <BotaoSkeleton /> }
);

function BotaoSkeleton() {
  return (
    <button disabled className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-muted text-sm cursor-not-allowed">
      Preparando PDF...
    </button>
  );
}

export function BotaoPDF() {
  return (
    <Suspense fallback={<BotaoSkeleton />}>
      <PDFDownloadLinkDynamic />
    </Suspense>
  );
}
