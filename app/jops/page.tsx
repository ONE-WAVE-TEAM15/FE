"use client";

import React, { useState } from "react";
import styles from "./page.module.css";

/* ===== Data ===== */
const JOB_FIELDS = ["프론트엔드 개발", "백엔드 개발", "UI/UX 디자인"];
const TECH_STACKS = ["React", "TypeScript", "Next.js", "Node.js", "Python"];

const JOBS_DATA = [
  {
    iconBg: "#FFD700",
    iconPath: "M8 12H16M12 8V16",
    companyName: "카카오 뱅크",
    companyDesc: "금융 서비스 · 프론트엔드",
    matchPercent: 92,
    techStacks: ["React", "TypeScript", "Next.js"],
    talentDesc: "자기주도적 문제 해결 및 기술적 집중 요함",
    specDesc: "코딩테스트 상위 5%, 대규모 트래픽 프로젝트",
  },
  {
    iconBg: "#FF6B35",
    iconPath: "",
    companyName: "당근마켓",
    companyDesc: "커뮤니티 서비스 · 웹 개발",
    matchPercent: 88,
    techStacks: ["React", "Emotion", "GraphQL"],
    talentDesc: "사용자 중심 사고 및 수평적 커뮤니케이션",
    specDesc: "오픈소스 기여 경험, UI 최적화 경험",
  },
  {
    iconBg: "#3B5BDB",
    iconPath: "",
    companyName: "토스 (Viva Republica)",
    companyDesc: "핀테크 · 프론트엔드 플랫폼",
    matchPercent: 85,
    techStacks: ["React", "Design System", "Testing"],
    talentDesc: "극도의 효율성 추구 및 빠른 실행력",
    specDesc: "컴포넌트 라이브러리 제작, 3년 이상 경력 우대",
  },
];

/* ===== Icon Components (inline SVGs) ===== */
function CompanyIcon({ bg, type }: { bg: string; type: number }) {
  if (type === 0) {
    return (
      <div className={styles.companyIcon} style={{ backgroundColor: bg }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="4" stroke="#FFF" strokeWidth="2" />
          <path d="M8 12H16M12 8V16" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  if (type === 1) {
    return (
      <div className={styles.companyIcon} style={{ backgroundColor: bg }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
          <path d="M15 3L21 9" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  return (
    <div className={styles.companyIcon} style={{ backgroundColor: bg }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ===== Main Page ===== */
export default function JobsPage() {
  const [selectedFields, setSelectedFields] = useState<string[]>(["프론트엔드 개발"]);
  const [selectedTech, setSelectedTech] = useState<string[]>(["React"]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const toggleField = (field: string) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field],
    );
  };

  const toggleTech = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    );
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.wrapper}>
      {/* ===== Header ===== */}
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <div className={styles.logoIcon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className={styles.logoText}>{"Comp-Pass"}</span>
        </div>

        <nav className={styles.nav} aria-label="메인 내비게이션">
          <a href="#" className={styles.navLink}>{"채용 공고"}</a>
          <a href="#" className={styles.navLink}>{"스펙 쌓기"}</a>
          <a href="#" className={styles.navLink}>{"포트폴리오 분석"}</a>
          <a href="/jobs" className={styles.navLinkActive}>{"모의면접"}</a>
        </nav>

        <div className={styles.rightArea}>
          <div className={styles.userArea}>
            <div className={styles.avatar}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className={styles.userName}>{"김철수 님"}</span>
          </div>
          <button type="button" className={styles.bellButton} aria-label="알림">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* ===== Main Content ===== */}
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Filter Sidebar */}
          <aside className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>{"맞춤 필터"}</h2>

            <p className={styles.sectionLabel}>{"직무 분야"}</p>
            <div className={styles.checkboxGroup}>
              {JOB_FIELDS.map((field) => (
                <label key={field} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={selectedFields.includes(field)}
                    onChange={() => toggleField(field)}
                  />
                  {field}
                </label>
              ))}
            </div>

            <p className={styles.sectionLabel}>{"기술 스택"}</p>
            <div className={styles.techTags}>
              {TECH_STACKS.map((tech) => (
                <button
                  key={tech}
                  type="button"
                  className={selectedTech.includes(tech) ? styles.techTagActive : styles.techTag}
                  onClick={() => toggleTech(tech)}
                >
                  {tech}
                </button>
              ))}
            </div>

            <button type="button" className={styles.applyButton}>
              {"필터 적용하기"}
            </button>
          </aside>

          {/* Job Listings */}
          <section className={styles.listings}>
            <div className={styles.listingsHeaderRow}>
              <h1 className={styles.listingsTitle}>{"실시간 채용공고 분석"}</h1>
              <select className={styles.sortSelect} defaultValue="latest">
                <option value="latest">{"최신 순"}</option>
                <option value="match">{"매칭 순"}</option>
              </select>
            </div>
            <p className={styles.subtitle}>
              {"당신의 역량과 가장 잘 맞는 공고 24개를 찾았습니다."}
            </p>

            <div className={styles.cardList}>
              {JOBS_DATA.map((job, index) => (
                <article key={job.companyName} className={styles.card}>
                  <div className={styles.cardLeft}>
                    <div className={styles.companyRow}>
                      <CompanyIcon bg={job.iconBg} type={index} />
                      <div className={styles.companyInfo}>
                        <h3 className={styles.companyName}>{job.companyName}</h3>
                        <p className={styles.companyDesc}>{job.companyDesc}</p>
                      </div>
                      <span className={styles.matchBadge}>{`MATCH ${job.matchPercent}%`}</span>
                    </div>

                    <div className={styles.cardTechRow}>
                      <p className={styles.cardTechLabel}>{"기술 스택"}</p>
                      <div className={styles.cardTechTags}>
                        {job.techStacks.map((tech) => (
                          <span key={tech} className={styles.cardTechTag}>{tech}</span>
                        ))}
                      </div>
                    </div>

                    <div className={styles.infoRow}>
                      <div className={styles.infoBox}>
                        <p className={styles.infoBoxLabel}>{"핵심 인재상"}</p>
                        <p className={styles.infoBoxText}>{job.talentDesc}</p>
                      </div>
                      <div className={styles.infoBox}>
                        <p className={styles.infoBoxLabel}>{"최근 합격 스펙"}</p>
                        <p className={styles.infoBoxText}>{job.specDesc}</p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.cardRight}>
                    <button type="button" className={styles.reportButton}>
                      {"AI 분석 리포트 →"}
                    </button>
                    <button type="button" className={styles.saveButton}>
                      {"공고 저장하기"}
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <nav className={styles.pagination} aria-label="페이지 네비게이션">
              <button
                type="button"
                className={styles.arrowButton}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="이전 페이지"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {pages.map((page) => (
                <button
                  key={page}
                  type="button"
                  className={page === currentPage ? styles.pageButtonActive : styles.pageButton}
                  onClick={() => setCurrentPage(page)}
                  aria-current={page === currentPage ? "page" : undefined}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                className={styles.arrowButton}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                aria-label="다음 페이지"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </nav>
          </section>
        </div>
      </main>

      {/* ===== Footer ===== */}
      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <div className={styles.footerLogoIcon}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className={styles.footerBrand}>{"Comp-Pass"}</span>
        </div>

        <span className={styles.footerCenter}>
          {"© 2025 Comp-Pass. All rights reserved."}
        </span>

        <div className={styles.footerSocials}>
          <a href="#" className={styles.socialIcon} aria-label="Instagram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
            </svg>
          </a>
          <a href="#" className={styles.socialIcon} aria-label="YouTube">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22.54 6.42C22.4212 5.94541 22.1793 5.51057 21.8387 5.15941C21.498 4.80824 21.0708 4.55318 20.6 4.42C18.88 4 12 4 12 4C12 4 5.12 4 3.4 4.46C2.92925 4.59318 2.50198 4.84824 2.16135 5.19941C1.82072 5.55057 1.57879 5.98541 1.46 6.46C1 8.18 1 12 1 12C1 12 1 15.82 1.46 17.54C1.69 18.49 2.44 19.24 3.4 19.46C5.12 19.92 12 19.92 12 19.92C12 19.92 18.88 19.92 20.6 19.46C21.56 19.24 22.31 18.49 22.54 17.54C23 15.82 23 12 23 12C23 12 23 8.18 22.54 6.42Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.75 15.02L15.5 12L9.75 8.98V15.02Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
