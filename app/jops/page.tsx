"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { getJobs, Job } from "./jobs";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/* ===== Data ===== */
const JOB_FIELDS_MAP: { [key: string]: string } = {
  "프론트엔드 개발": "FE",
  "백엔드 개발": "BE",
  "UI/UX 디자인": "DESIGN",
  "클라우드 개발": "Cloud",
};
const JOB_FIELDS = Object.keys(JOB_FIELDS_MAP);
const TECH_STACKS = ["React", "TypeScript", "Next.js", "Node.js", "Python"];

/* ===== Icon Components (inline SVGs) ===== */
function CompanyIcon({ bg, type }: { bg: string; type: number }) {
  if (type % 3 === 0) {
    return (
      <div className={styles.companyIcon} style={{ backgroundColor: bg }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="4"
            stroke="#FFF"
            strokeWidth="2"
          />
          <path
            d="M8 12H16M12 8V16"
            stroke="#FFF"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }
  if (type % 3 === 1) {
    return (
      <div className={styles.companyIcon} style={{ backgroundColor: bg }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12"
            stroke="#FFF"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M15 3L21 9"
            stroke="#FFF"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }
  return (
    <div className={styles.companyIcon} style={{ backgroundColor: bg }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
          stroke="#FFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

const BG_COLORS = ["#FFD700", "#FF6B35", "#3B5BDB", "#4CAF50", "#9C27B0"];

/* ===== Main Page ===== */
export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([
    "프론트엔드 개발",
  ]);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const jobsPerPage = 5;
  const totalPages = Math.ceil(jobs.length / jobsPerPage) || 1;

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const domain =
        selectedFields.length > 0
          ? JOB_FIELDS_MAP[selectedFields[0]]
          : undefined;
      const data = await getJobs(domain);
      setJobs(data);
      setCurrentPage(1); // Reset to first page on new fetch
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [selectedFields]);

  const toggleField = (field: string) => {
    setSelectedFields(
      (prev) =>
        prev.includes(field) ? prev.filter((f) => f !== field) : [field], // Single select for API domain
    );
  };

  const toggleTech = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    );
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const displayedJobs = jobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage,
  );

  return (
    <div className={styles.wrapper}>
      {/* ===== Header ===== */}
      <Header />

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
                  className={
                    selectedTech.includes(tech)
                      ? styles.techTagActive
                      : styles.techTag
                  }
                  onClick={() => toggleTech(tech)}
                >
                  {tech}
                </button>
              ))}
            </div>

            <button
              type="button"
              className={styles.applyButton}
              onClick={fetchJobs}
            >
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
              {loading
                ? "데이터를 불러오는 중입니다..."
                : `당신의 역량과 가장 잘 맞는 공고 ${jobs.length}개를 찾았습니다.`}
            </p>

            <div className={styles.cardList}>
              {displayedJobs.map((job, index) => (
                <article key={job.id} className={styles.card}>
                  <div className={styles.cardLeft}>
                    <div className={styles.companyRow}>
                      <CompanyIcon
                        bg={BG_COLORS[job.id % BG_COLORS.length]}
                        type={job.id}
                      />
                      <div className={styles.companyInfo}>
                        <h3 className={styles.companyName}>{job.company}</h3>
                        <p className={styles.companyDesc}>{job.title}</p>
                      </div>
                      <span
                        className={styles.matchBadge}
                      >{`MATCH ${90 - index * 2}%`}</span>
                    </div>

                    <div className={styles.cardTechRow}>
                      <p className={styles.cardTechLabel}>{"기술 스택"}</p>
                      <div className={styles.cardTechTags}>
                        {job.skills_required.split(",").map((tech) => (
                          <span
                            key={tech.trim()}
                            className={styles.cardTechTag}
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={styles.infoRow}>
                      <div className={styles.infoBox}>
                        <p className={styles.infoBoxLabel}>
                          {"핵심 직무 설명"}
                        </p>
                        <p className={styles.infoBoxText}>
                          {job.description.length > 150
                            ? job.description.substring(0, 150) + "..."
                            : job.description}
                        </p>
                      </div>
                      <div className={styles.infoBox}>
                        <p className={styles.infoBoxLabel}>{"도메인"}</p>
                        <p className={styles.infoBoxText}>{job.domain}</p>
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

              {!loading && jobs.length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#888",
                  }}
                >
                  {"검색 결과가 없습니다."}
                </div>
              )}
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
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {pages.map((page) => (
                <button
                  key={page}
                  type="button"
                  className={
                    page === currentPage
                      ? styles.pageButtonActive
                      : styles.pageButton
                  }
                  onClick={() => setCurrentPage(page)}
                  aria-current={page === currentPage ? "page" : undefined}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                className={styles.arrowButton}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                aria-label="다음 페이지"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </nav>
          </section>
        </div>
      </main>

      {/* ===== Footer ===== */}
      <Footer />
    </div>
  );
}
