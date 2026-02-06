import React from "react"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comp-Pass | 커리어 허들",
  description:
    "현재 가장 고민이 되는 커리어 허들을 선택하고, AI 기반 역량 진단을 시작하세요.",
};

export default function CareerHurdleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
