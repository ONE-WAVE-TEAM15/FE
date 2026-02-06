"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import s from "./analysis.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getPortfolioAnalysis } from "./analysisService";

/* ── Data Constants ── */
const SCORE_MAX = 100;
const CIRCUMFERENCE = 2 * Math.PI * 62;

/* ── Interfaces ── */
export interface RecommendedProgram {
  program_name: string;
  domain: string;
  start_date: string;
  due_date: string;
  program_skills: string;
  program_content: string;
  program_link: string;
  program_category: string;
  recommendation_reason: string;
}

// 제공해주신 JSON에 맞춘 인터페이스 정의
export interface AnalysisResponse {
  skill_match: string; // 기술 매칭 상세 설명
  fit_evaluation: string; // 종합 평가 (긴 줄글)
  missing_competencies: string[]; // 보완점 리스트 (단순 문자열 배열)
  overall_score: number;
  recommended_programs: RecommendedProgram[];
  analyzed_project: string;
  analyzed_job: string;
}

/* ── Component ── */
export default function PortfolioAnalysisPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(
    null,
  );

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }
    setIsLoggedIn(true);

    const fetchData = async () => {
      try {
        const result = await getPortfolioAnalysis();
        setAnalysisData(result as AnalysisResponse);
      } catch (error) {
        console.error("Failed to fetch analysis:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  if (!isLoggedIn) return null;

  if (loading) {
    return (
      <div className={s.pageWrapper}>
        <Header />
        <div
          className={s.loadingContainer}
          style={{
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <p
            style={{
              marginTop: "20px",
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "var(--cp-primary)",
            }}
          >
            AI가 포트폴리오를 정밀 분석 중입니다...
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  // 데이터 바인딩
  const SCORE = analysisData?.overall_score || 0;

  // 점수에 따른 프로그레스 바 (가상의 로직 적용)
  const progressBars = [
    { label: "직무 전문성", value: Math.min(SCORE + 10, 100) },
    { label: "기술 스택 일치도", value: SCORE }, // 점수 그대로 반영
    { label: "프로젝트 연관성", value: Math.max(SCORE - 5, 0) },
  ];

  // 데이터 안전 접근
  const missingCompetencies = analysisData?.missing_competencies || [];

  // 추천 프로그램에서 키워드 추출
  const keywords = (analysisData?.recommended_programs || [])
    .slice(0, 5)
    .map((prog, i) => ({
      text: `#${prog.program_skills.split(",")[0].trim()}`, // 첫번째 기술 스택을 키워드로 사용
      variant:
        i === 0
          ? ("primary" as const)
          : i === 1
            ? ("dark" as const)
            : ("default" as const),
    }));

  return (
    <div className={s.pageWrapper}>
      <Header />

      <div className={s.container}>
        {/* ── 1. 종합 점수 카드 (Score Card) ── */}
        <div
          className={s.card}
          style={{ position: "relative", overflow: "hidden" }}
        >
          {/* 배경 장식 */}
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
            <h1 className={s.pageTitle}>
              {/* 이름은 로그인 정보 등에서 가져오거나 기본값 처리 */}
              지원자님의 포트폴리오 점수는
            </h1>
            <span className={s.topBadge}>
              {SCORE >= 80
                ? "상위 5%"
                : SCORE >= 50
                  ? "평균 수준"
                  : "보완 필요"}
            </span>
          </div>

          <div className={s.scoreHeader}>
            {/* 원형 차트 */}
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

            {/* 세부 점수 바 */}
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

          {/* skill_match 데이터를 활용한 종합 코멘트 */}
          <p className={s.scoreDesc}>
            <span className={s.scoreDescBold}>
              [{analysisData?.analyzed_job || "지원 직무"}]
            </span>{" "}
            분석 결과,
            <br />
            {analysisData?.skill_match || "분석 결과가 없습니다."}
          </p>
        </div>

        {/* ── 2. 상세 평가 및 보완점 (2 Column) ── */}
        <div className={s.twoCol}>
          {/* 왼쪽: 종합 평가 (fit_evaluation - 줄글 형태) */}
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
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
              </span>
              AI 종합 평가 상세
            </div>

            <div
              className={s.feedbackContentBox}
              style={{ lineHeight: "1.6", color: "#444", fontSize: "0.95rem" }}
            >
              {analysisData?.fit_evaluation
                ? analysisData.fit_evaluation
                : "상세 평가 데이터가 없습니다."}
            </div>
          </div>

          {/* 오른쪽: 보완 필요 역량 (missing_competencies - 리스트 형태) */}
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
              보완이 필요한 핵심 역량
            </div>
            <ul className={s.feedbackList}>
              {missingCompetencies.length > 0 ? (
                missingCompetencies.map((item, idx) => (
                  <li key={idx} className={s.feedbackItem}>
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
                      {/* 단순 문자열이므로 바로 출력 */}
                      <div
                        className={s.feedbackTitle}
                        style={{ fontWeight: 500 }}
                      >
                        {item}
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className={s.feedbackItem}>
                  <div className={s.feedbackContent}>
                    특별히 발견된 부족 역량이 없습니다.
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* ── 3. 채용 시장 적합도 (Market Fit) ── */}
        <div className={s.card}>
          <h2 className={s.sectionTitle}>채용 시장 적합도</h2>
          <div className={s.marketCards}>
            <div className={s.marketCard}>
              <div className={s.marketCardLabel}>추천 기업 규모</div>
              <div className={s.marketCardValue}>시리즈 B 이상 / 중견</div>
              <div className={s.marketCardStars}>
                {[1, 2, 3].map((i) => (
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
                {[4, 5].map((i) => (
                  <svg
                    key={i}
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
                ))}
              </div>
            </div>
            <div className={s.marketCard}>
              <div className={s.marketCardLabel}>예상 연봉 범위</div>
              <div className={s.marketCardValue}>4,200 ~ 5,000</div>
              <div className={s.marketCardSub}>(단위: 만원 / 신입 기준)</div>
            </div>
            <div className={s.marketCard}>
              <div className={s.marketCardLabel}>서류 통과 예상 확률</div>
              <div className={s.marketCardValue}>
                {Math.min(SCORE + 20, 95)}%
              </div>
              <div className={s.marketCardHighlight}>
                {SCORE < 50
                  ? "포트폴리오 보완 시 급상승 가능"
                  : "평균 대비 높음"}
              </div>
            </div>
          </div>
        </div>

        {/* ── 4. AI 추출 핵심 키워드 ── */}
        <div className={s.card}>
          <h2 className={s.sectionTitle}>AI 추출 추천 키워드</h2>
          <div className={s.keywordTags}>
            {keywords.map((kw, i) => (
              <span
                key={i}
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
        <button
          type="button"
          className={s.btnDark}
          onClick={() => window.location.reload()}
        >
          분석 다시하기
        </button>
        <Link href="/jobs" className={s.btnPrimary}>
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
