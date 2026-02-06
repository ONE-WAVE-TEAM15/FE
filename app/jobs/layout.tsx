import React from "react"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comp-Pass | 채용공고 분석",
  description:
    "실시간 채용공고 분석 - 당신의 역량과 가장 잘 맞는 채용공고를 찾아드립니다.",
};

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
