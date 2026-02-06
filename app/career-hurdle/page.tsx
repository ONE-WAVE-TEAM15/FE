"use client";

import React, { useState } from "react";
import s from "./page.module.css";

/* ── data ── */
const CARDS = [
  {
    id: "portfolio",
    icon: "doc",
    title: "서류 및 포트폴리오 준비",
    desc: "나의 강점을 어떻게 문서화하고 시각화해야 할지 막막합니다.",
  },
  {
    id: "interview",
    icon: "chat",
    title: "실전 면접 대응",
    desc: "예상치 못한 질문에 대한 압박과 커뮤니케이션 역량 부족을 느낍니다.",
  },
  {
    id: "skill",
    icon: "layers",
    title: "직무 역량(스펙) 강화",
    desc: "실무에서 요구하는 기술 스택이나 자격 요건을 채우는 것이 어렵습니다.",
  },
  {
    id: "roadmap",
    icon: "people",
    title: "커리어 로드맵 설계",
    desc: "장기적으로 어떤 방향으로 나아가야 할지 비전 설정이 필요합니다.",
  },
] as const;

const STEP = 3;
const TOTAL_STEPS = 8;

/* ── icons ── */
function DocIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        stroke="#FF5A5F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        stroke="#999"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function LayersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
        stroke="#999"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function PeopleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
        stroke="#999"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const iconMap: Record<string, React.FC> = {
  doc: DocIcon,
  chat: ChatIcon,
  layers: LayersIcon,
  people: PeopleIcon,
};

/* ── Page ── */
export default function CareerHurdlePage() {
  const [selected, setSelected] = useState<string | null>("portfolio");

  return (
    <div className={s.wrapper}>
      {/* ── Header ── */}
      <header className={s.header}>
        <div className={s.logoArea}>
          <div className={s.logoIcon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className={s.logoText}>Comp-Pass</span>
        </div>

        <div className={s.headerRight}>
          <div className={s.progressBar}>
            <div
              className={s.progressFill}
              style={{ width: `${(STEP / TOTAL_STEPS) * 100}%` }}
            />
          </div>
          <span className={s.stepLabel}>
            STEP {String(STEP).padStart(2, "0")} / {String(TOTAL_STEPS).padStart(2, "0")}
          </span>
          <button type="button" className={s.closeButton} aria-label="닫기">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* ── Main ── */}
      <main className={s.main}>
        <div className={s.content}>
          <span className={s.badge}>{"역량 진단 단계"}</span>

          <h1 className={s.questionTitle}>
            {"현재 가장 고민이 되는"}
            <br />
            <span className={s.questionHighlight}>{"커리어 허들"}</span>
            {"은 무엇인가요?"}
          </h1>

          <p className={s.questionSub}>
            {"가장 우선순위가 높은 고민 하나를 선택해 주세요."}
          </p>

          {/* Cards */}
          <div className={s.cardGrid}>
            {CARDS.map((card) => {
              const isSelected = selected === card.id;
              const Icon = iconMap[card.icon];
              return (
                <button
                  key={card.id}
                  type="button"
                  className={`${s.card} ${isSelected ? s.cardSelected : ""}`}
                  onClick={() => setSelected(card.id)}
                  aria-pressed={isSelected}
                >
                  {isSelected && (
                    <div className={s.cardCheck}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M20 6L9 17l-5-5"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                  <div
                    className={`${s.cardIconWrap} ${
                      isSelected ? s.cardIconWrapActive : s.cardIconWrapInactive
                    }`}
                  >
                    <Icon />
                  </div>
                  <p className={s.cardTitle}>{card.title}</p>
                  <p className={s.cardDesc}>{card.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Trust badges */}
          <div className={s.trustRow}>
            <span className={s.trustItem}>
              <span className={`${s.trustDot} ${s.trustDotRed}`} />
              DATA PRIVACY GUARANTEED
            </span>
            <span className={s.trustItem}>
              <span className={`${s.trustDot} ${s.trustDotYellow}`} />
              AI-POWERED ANALYSIS
            </span>
          </div>
        </div>
      </main>

      {/* ── Bottom Bar ── */}
      <footer className={s.bottomBar}>
        <button type="button" className={s.prevButton}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {"이전 단계로"}
        </button>

        <div className={s.bottomBarRight}>
          <span className={s.helperText}>
            {"답변을 선택하면 다음으로 넘어갈 수 있습니다."}
          </span>
          <button
            type="button"
            className={`${s.nextButton} ${!selected ? s.nextButtonDisabled : ""}`}
            disabled={!selected}
          >
            {"다음 질문"}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M12 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}
