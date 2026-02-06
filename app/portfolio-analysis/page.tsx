"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import s from "./analysis.module.css";
import Link from "next/link";

/* ── Data ── */
const SCORE = 85;
const SCORE_MAX = 100;
const CIRCUMFERENCE = 2 * Math.PI * 62;

const progressBars = [
  { label: "직무 전문성", value: 92 },
  { label: "경력 일관성", value: 78 },
  { label: "프로젝트 완결성", value: 85 },
];

const strengths = [
  {
    title: "데이터 기반 의사결정",
    desc: "수치를 활용한 성과 지표 제시가 명확하여 신뢰도가 높습니다.",
  },
  {
    title: "최신 기술 스택 보유",
    desc: "Figma, Tailwind 등 트렌디한 도구 활용 능력이 우수합니다.",
  },
  {
    title: "직관적인 요약 능력",
    desc: "전문가 요약 섹션이 핵심 가치를 잘 전달하고 있습니다.",
  },
];

const improvements = [
  {
    title: "경력 공백기 설명 부족",
    desc: "2023년 하반기 공백기에 대한 학습 활동 추가를 권장합니다.",
  },
  {
    title: "프로젝트 역할 구체화",
    desc: "팀 프로젝트 내 본인의 기여도를 %로 명시하면 더 좋습니다.",
  },
  {
    title: "포트폴리오 링크 부재",
    desc: "실제 결과물을 확인할 수 있는 외부 링크 첨부가 필요합니다.",
  },
];

const keywords = [
  { text: "#사용자_경험_최적화", variant: "primary" as const },
  { text: "#데이터_드리븐", variant: "dark" as const },
  { text: "#협업_능력", variant: "default" as const },
  { text: "#디자인_시스템", variant: "default" as const },
  { text: "#문제_해결사", variant: "default" as const },
  { text: "#프로토타이핑", variant: "default" as const },
  { text: "#애자일", variant: "default" as const },
];

export default function PortfolioAnalysisPage() {
  return (
    <div className={s.pageWrapper}>
      <Header />

      <div className={s.container}>
        {/* ── Score Card ── */}
        <div
          className={s.card}
          style={{ position: "relative", overflow: "hidden" }}
        >
          {/* Decoration */}
          <div className={s.scoreDecoIcon}>
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              <circle
                cx="60"
                cy="60"
                r="55"
                stroke="var(--cp-primary)"
                strokeWidth="2"
                opacity="0.3"
              />
              <circle
                cx="60"
                cy="60"
                r="38"
                stroke="var(--cp-primary)"
                strokeWidth="2"
                opacity="0.2"
              />
              <path
                d="M60 20 L66 40 L88 40 L70 52 L76 72 L60 60 L44 72 L50 52 L32 40 L54 40Z"
                fill="var(--cp-primary)"
                opacity="0.15"
              />
            </svg>
          </div>

          <div className={s.titleRow}>
            <h1 className={s.pageTitle}>김철수 님의 포트폴리오 점수는</h1>
            <span className={s.topBadge}>상위 12%</span>
          </div>

          <div className={s.scoreHeader}>
            {/* Circle */}
            <div className={s.circleScoreWrap}>
              <svg className={s.circleSvg} viewBox="0 0 140 140">
                <circle className={s.circleTrack} cx="70" cy="70" r="62" />
                <circle
                  className={s.circleFill}
                  cx="70"
                  cy="70"
                  r="62"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={
                    CIRCUMFERENCE - (CIRCUMFERENCE * SCORE) / SCORE_MAX
                  }
                />
              </svg>
              <div className={s.circleText}>
                <div className={s.circleNumber}>{SCORE}</div>
                <div className={s.circleLabel}>/ {SCORE_MAX}</div>
              </div>
            </div>

            {/* Progress bars */}
            <div className={s.progressList}>
              {progressBars.map((bar) => (
                <div key={bar.label} className={s.progressItem}>
                  <span className={s.progressLabel}>{bar.label}</span>
                  <div className={s.progressBarWrap}>
                    <div
                      className={s.progressBar}
                      style={{ width: `${bar.value}%` }}
                    />
                  </div>
                  <span className={s.progressValue}>{bar.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <p className={s.scoreDesc}>
            철수 님의 포트폴리오는{" "}
            <span className={s.scoreDescBold}>UI/UX 디자인 실무 역량</span>이
            매우 구체적으로 잘 드러나 있습니다. 특히 프로젝트의 문제 해결 과정이
            논리적으로 기술되어 있어 실무진 면접에서 긍정적인 평가를 받을
            가능성이 높습니다.
          </p>
        </div>

        {/* ── Strengths & Improvements ── */}
        <div className={s.twoCol}>
          {/* Strengths */}
          <div className={s.halfCard}>
            <div className={s.halfCardTitle}>
              <span className={`${s.halfCardTitleIcon} ${s.strengthIcon}`}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              AI가 찾은 강점
            </div>
            <ul className={s.feedbackList}>
              {strengths.map((item) => (
                <li key={item.title} className={s.feedbackItem}>
                  <span className={`${s.feedbackDot} ${s.feedbackDotGreen}`}>
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <div className={s.feedbackContent}>
                    <div className={s.feedbackTitle}>{item.title}</div>
                    <div className={s.feedbackDesc}>{item.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Improvements */}
          <div className={s.halfCard}>
            <div className={s.halfCardTitle}>
              <span className={`${s.halfCardTitleIcon} ${s.improvementIcon}`}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 9v4M12 17h.01" />
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
              </span>
              보완이 필요한 점
            </div>
            <ul className={s.feedbackList}>
              {improvements.map((item) => (
                <li key={item.title} className={s.feedbackItem}>
                  <span className={`${s.feedbackDot} ${s.feedbackDotRed}`}>
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="1" fill="currentColor" />
                    </svg>
                  </span>
                  <div className={s.feedbackContent}>
                    <div className={s.feedbackTitle}>{item.title}</div>
                    <div className={s.feedbackDesc}>{item.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Market Fit ── */}
        <div className={s.card}>
          <h2 className={s.sectionTitle}>채용 시장 적합도</h2>
          <div className={s.marketCards}>
            <div className={s.marketCard}>
              <div className={s.marketCardLabel}>추천 기업 규모</div>
              <div className={s.marketCardValue}>유니콘 스타트업</div>
              <div className={s.marketCardStars}>
                {[1, 2, 3, 4].map((i) => (
                  <svg
                    key={i}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    className={s.starFilled}
                  >
                    <path
                      fill="currentColor"
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    />
                  </svg>
                ))}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  className={s.starEmpty}
                >
                  <path
                    fill="currentColor"
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  />
                </svg>
              </div>
            </div>
            <div className={s.marketCard}>
              <div className={s.marketCardLabel}>예상 연봉 범위</div>
              <div className={s.marketCardValue}>{"4,800 ~ 5,500"}</div>
              <div className={s.marketCardSub}>(단위: 만원 / 신입 기준)</div>
            </div>
            <div className={s.marketCard}>
              <div className={s.marketCardLabel}>서류 통과 예상 확률</div>
              <div className={s.marketCardValue}>74%</div>
              <div className={s.marketCardHighlight}>평균 대비 28% 높음</div>
            </div>
          </div>
        </div>

        {/* ── AI Keywords ── */}
        <div className={s.card}>
          <h2 className={s.sectionTitle}>AI 추출 핵심 키워드</h2>
          <div className={s.keywordTags}>
            {keywords.map((kw) => (
              <span
                key={kw.text}
                className={
                  kw.variant === "primary"
                    ? s.keywordTagPrimary
                    : kw.variant === "dark"
                      ? s.keywordTagDark
                      : s.keywordTag
                }
              >
                {kw.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Actions ── */}
      <div className={s.bottomActions}>
        <button type="button" className={s.btnOutline}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          리포트 다운로드
        </button>
        <button type="button" className={s.btnDark}>
          분석 다시하기
        </button>
        <Link type="button" className={s.btnPrimary} href="/jobs">
          맞춤 공고 확인하기
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <Footer />
    </div>
  );
}
