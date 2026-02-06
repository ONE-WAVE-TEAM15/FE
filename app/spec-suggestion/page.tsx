"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import s from "./spec.module.css";

/* ── Star helper ── */
function Stars({ filled, total = 5 }: { filled: number; total?: number }) {
  return (
    <span className={s.ratingStars}>
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={i < filled ? s.starFilled : s.starEmpty}>
          ★
        </span>
      ))}
    </span>
  );
}

/* ── Circle Score (70%) ── */
function CircleScore({ value }: { value: number }) {
  const r = 60;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={s.circleScoreWrap}>
      <svg className={s.circleSvg} viewBox="0 0 150 150">
        <circle cx="75" cy="75" r={r} className={s.circleTrack} />
        <circle
          cx="75"
          cy="75"
          r={r}
          className={s.circleFill}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className={s.circleText}>
        <div className={s.circleNumber}>{value}%</div>
        <div className={s.circleLabel}>READY</div>
      </div>
    </div>
  );
}

/* ── Roadmap data ── */
const roadmapSteps = [
  {
    icon: "🎓",
    title: "금융 도메인 지식 습득",
    badge: "추천",
    badgeClass: "badgeRecommend",
    desc: "핀테크 산업의 이해와 전자금융거래법 기초 지식 확보",
    tags: ["AFPK 자격 취득", "금융보안원 교육 수료"],
  },
  {
    icon: "</>",
    title: "도메인 타겟 프로젝트",
    badge: "핵심",
    badgeClass: "badgeCore",
    desc: "오픈뱅킹 API 또는 간편결제 시스템 모의 구축 프로젝트",
    tags: ["오픈 API 연동 실습", "보안 프로토콜 적용"],
  },
  {
    icon: "💼",
    title: "실무 경험 및 네트워크",
    badge: "심화",
    badgeClass: "badgeAdvanced",
    desc: "핀테크 스타트업 인턴십 또는 해커톤 참여",
    tags: ["핀테크 위크 해커톤", "도메인 특화 부트캠프"],
  },
];

/* ── Keywords data ── */
const keywords = [
  { icon: "🔒", label: "트랜잭션 보안" },
  { icon: "🏦", label: "오픈뱅킹 API" },
  { icon: "💳", label: "결제 정산 시스템" },
  { icon: "👥", label: "KYC/AML 이해" },
  { icon: "🔗", label: "블록체인 기초" },
  { icon: "📊", label: "마이데이터 사업" },
];

/* ── Insight data ── */
const insights = [
  { icon: "🏢", label: "인기 타겟 기업", value: "토스, 카카오페이" },
  { icon: "💰", label: "신입 초봉 평균", value: "5,200 ~ 6,000" },
  { icon: "🔍", label: "가장 부족한 스펙", value: "도메인 실무 프로젝트" },
  { icon: "📅", label: "추천 채용 시즌", value: "상시 및 9월 공채" },
];

export default function SpecSuggestionPage() {
  return (
    <div className={s.pageWrapper}>
      <Header />

      <div className={s.container}>
        {/* ── Page Header ── */}
        <div className={s.headerMeta}>
          <span className={s.reportBadge}>도메인 타겟팅 리포트</span>
          <span className={s.dateMeta}>| 2025.05 분석 기준</span>
        </div>
        <h1 className={s.pageTitle}>
          김철수 님을 위한
          <br />
          <span className={s.pageTitleHighlight}>핀테크(Fin-tech) 도메인</span>{" "}
          맞춤형 스펙 제안
        </h1>

        {/* ── Row 1: Readiness + Roadmap ── */}
        <div className={s.twoCol}>
          {/* Left: 도메인 준비도 진단 */}
          <div className={s.colLeft}>
            <div className={s.readinessCard}>
              <div className={s.cardTitle}>도메인 준비도 진단</div>

              <div className={s.circleWrap}>
                <CircleScore value={70} />
              </div>

              <div className={s.ratingList}>
                <div className={s.ratingRow}>
                  <span className={s.ratingLabel}>도메인 지식</span>
                  <Stars filled={3} />
                </div>
                <div className={s.ratingRow}>
                  <span className={s.ratingLabel}>기술 스택 일치도</span>
                  <Stars filled={4} />
                </div>
                <div className={s.ratingRow}>
                  <span className={s.ratingLabel}>프로젝트 연관성</span>
                  <Stars filled={2} />
                </div>
              </div>

              <div className={s.tipBox}>
                <span className={s.tipIcon}>💡</span> 현재 기술 역량은
                충분하니,{" "}
                <span className={s.tipBold}>
                  금융 보안 및 결제 프로세스
                </span>
                에 대한 도메인 경험 보완이 최우선 과제입니다.
              </div>
            </div>
          </div>

          {/* Right: 도메인 특화 스펙 로드맵 */}
          <div className={s.colRight}>
            <div className={s.roadmapCard}>
              <div className={s.cardTitle}>도메인 특화 스펙 로드맵</div>
              <div className={s.roadmapDots}>
                <span className={s.dotActive} />
                <span className={s.dot} />
                <span className={s.dot} />
              </div>

              <div className={s.roadmapSteps}>
                {roadmapSteps.map((step) => (
                  <div key={step.title} className={s.roadmapStep}>
                    <div className={s.stepIcon}>{step.icon}</div>
                    <div className={s.stepContent}>
                      <div className={s.stepTitleRow}>
                        <span className={s.stepTitle}>{step.title}</span>
                        <span
                          className={`${s.stepBadge} ${s[step.badgeClass]}`}
                        >
                          {step.badge}
                        </span>
                      </div>
                      <div className={s.stepDesc}>{step.desc}</div>
                      <div className={s.stepTags}>
                        {step.tags.map((tag) => (
                          <span key={tag} className={s.stepTag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Row 2: TOP PICK + Keywords ── */}
        <div className={s.twoCol}>
          {/* Left: TOP PICK */}
          <div className={s.colLeft}>
            <div className={s.topPickCard}>
              <div className={s.topPickLabel}>TOP PICK</div>
              <div className={s.topPickTitle}>
                금융 데이터 분석
                <br />
                전문가 과정
              </div>
              <div className={s.topPickDesc}>
                핀테크 기업이 가장 선호하는 데이터 핸들링 역량을 단기간에 확보할
                수 있는 코스입니다.
              </div>
              <button type="button" className={s.topPickBtn}>
                상세 정보 보기
              </button>
              <div className={s.topPickDeco}>{"</>"}</div>
            </div>
          </div>

          {/* Right: 필수 역량 키워드 */}
          <div className={s.colRight}>
            <div className={s.keywordsCard}>
              <div className={s.cardTitle}>핀테크 필수 역량 키워드</div>

              <div className={s.keywordTags}>
                {keywords.map((kw) => (
                  <span key={kw.label} className={s.keywordTag}>
                    <span className={s.keywordTagIcon}>{kw.icon}</span>
                    {kw.label}
                  </span>
                ))}
              </div>

              <div className={s.guideTip}>
                <div className={s.guideTipText}>
                  <div className={s.guideTipTitle}>
                    이 키워드들을 자기소개서에 녹여보세요!
                  </div>
                  <div className={s.guideTipDesc}>
                    AI가 분석한 핀테크 합격자 공통 핵심 키워드입니다.
                  </div>
                </div>
                <button type="button" className={s.guideBtn}>
                  가이드 다운로드
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── 채용 시장 인사이트 ── */}
        <div className={s.card}>
          <div className={s.insightHeader}>
            <div>
              <div className={s.sectionTitle} style={{ marginBottom: 0 }}>
                핀테크 채용 시장 인사이트
              </div>
            </div>
            <div>
              <div className={s.competitionLabel}>평균 경쟁률</div>
              <div className={s.competitionValue}>42 : 1</div>
            </div>
          </div>
          <div className={s.insightSub}>
            최근 6개월간 주요 핀테크 기업 채용 공고 분석 결과
          </div>

          <div className={s.insightCards}>
            {insights.map((item) => (
              <div key={item.label} className={s.insightCard}>
                <div className={s.insightCardIcon}>{item.icon}</div>
                <div className={s.insightCardLabel}>{item.label}</div>
                <div className={s.insightCardValue}>{item.value}</div>
              </div>
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
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
          리포트 공유하기
        </button>
        <button type="button" className={s.btnDark}>
          다른 도메인 추천받기
        </button>
        <button type="button" className={s.btnPrimary}>
          로드맵 실천 시작하기
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
            <path d="M22 2L15 22l-4-9-9-4z" />
          </svg>
        </button>
      </div>

      <Footer />
    </div>
  );
}