"use client";

import React, { useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import s from "./portfolio.module.css";
import { createPortfolio, PortfolioRequest } from "./portfolioService";

const STEPS = ["기본 정보", "경력 사항", "보유 기술"];

const SUGGESTED_SKILLS = ["#Adobe XD", "#TypeScript", "#Git"];

interface CareerEntry {
  id: number;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

const emptyCareer = (): CareerEntry => ({
  id: Date.now(),
  company: "",
  role: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  description: "",
});

export default function PortfolioPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  /* 기본 정보 */
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [summary, setSummary] = useState("");

  /* 경력 사항 */
  const [careers, setCareers] = useState<CareerEntry[]>([emptyCareer()]);

  /* 보유 기술 */
  const [skills, setSkills] = useState<string[]>([
    "Figma",
    "Tailwind CSS",
    "React",
  ]);
  const [skillInput, setSkillInput] = useState("");

  const addCareer = () => setCareers((prev) => [...prev, emptyCareer()]);

  const removeCareer = (id: number) =>
    setCareers((prev) => prev.filter((c) => c.id !== id));

  const updateCareer = (
    id: number,
    field: keyof CareerEntry,
    value: string | boolean,
  ) =>
    setCareers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    );

  const handleSkillKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim() && skills.length < 10) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills((prev) => [...prev, skillInput.trim()]);
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) =>
    setSkills((prev) => prev.filter((s) => s !== skill));

  const addSuggestedSkill = (skill: string) => {
    const clean = skill.replace("#", "");
    if (!skills.includes(clean) && skills.length < 10) {
      setSkills((prev) => [...prev, clean]);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // API 스펙에 맞춰 데이터 매핑 (이미지 참조)
      const firstCareer = careers[0] || {};
      const portfolioData: PortfolioRequest = {
        self_summary: summary,
        user_skills: skills.join(", "),
        external_links: "", // 현재 UI에는 없지만 스펙상 포함
        title: job || "포트폴리오",
        start_date: firstCareer.startDate || "2026-02-06",
        end_date: firstCareer.isCurrent
          ? "2026-02-06"
          : firstCareer.endDate || "2026-02-06",
        content: firstCareer.description || "상세 내용",
        skills_used: skills.slice(0, 3).join(", "), // 예시로 일부 사용
        results: "주요 성과 요약", // 현재 UI에 맞춰 매핑
      };

      await createPortfolio(portfolioData);
      alert("포트폴리오가 성공적으로 저장되었습니다!");
      router.push("/portfolio-analysis");
    } catch (error: any) {
      alert(error.response?.data?.message || "저장 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    const target = document.getElementById(`portfolio-step-${index}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={s.pageWrapper}>
      <Header />

      <div className={s.container}>
        {/* ── Sidebar ── */}
        <aside className={s.sidebar}>
          <h2 className={s.sidebarTitle}>포트폴리오 작성</h2>
          <ul className={s.stepList}>
            {STEPS.map((step, i) => (
              <li key={step}>
                <button
                  type="button"
                  className={i === activeStep ? s.stepItemActive : s.stepItem}
                  onClick={() => handleStepClick(i)}
                >
                  <span
                    className={
                      i === activeStep ? s.stepNumberActive : s.stepNumber
                    }
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step}
                </button>
              </li>
            ))}
          </ul>

          {/* AI Card */}
          <div className={s.aiCard}>
            <div className={s.aiCardIcon}>
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" />
              </svg>
            </div>
            <div className={s.aiCardTitle}>AI 분석 준비 완료</div>
            <p className={s.aiCardDesc}>
              입력하신 데이터를 기반으로 합격 확률을 실시간 분석합니다.
            </p>
            <div className={s.aiCardProgress}>
              <div className={s.aiCardProgressBar} />
            </div>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className={s.mainContent}>
          {/* 기본 정보 */}
          <section
            id="portfolio-step-0"
            className={`${s.card} ${s.scrollAnchor}`}
          >
            <div className={s.cardHeader}>
              <h3 className={s.cardTitle}>기본 정보</h3>
              <span className={s.required}>* 필수 입력</span>
            </div>

            <div className={s.formRow}>
              <div className={s.formGroup}>
                <label className={`${s.label} ${s.labelRequired}`}>이름</label>
                <input
                  className={s.input}
                  placeholder="성함을 입력해주세요"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={s.formGroup}>
                <label className={`${s.label} ${s.labelRequired}`}>
                  희망 직무
                </label>
                <select
                  className={s.select}
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                >
                  <option value="">직무를 선택하세요</option>
                  <option value="frontend">프론트엔드 개발자</option>
                  <option value="backend">백엔드 개발자</option>
                  <option value="designer">UI/UX 디자이너</option>
                  <option value="pm">프로덕트 매니저</option>
                  <option value="data">데이터 분석가</option>
                </select>
              </div>
            </div>

            <div className={s.formRow}>
              <div className={s.formGroup}>
                <label className={`${s.label} ${s.labelRequired}`}>
                  이메일 주소
                </label>
                <input
                  className={s.input}
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={s.formGroup}>
                <label className={`${s.label} ${s.labelRequired}`}>
                  휴대폰 번호
                </label>
                <input
                  className={s.input}
                  type="tel"
                  placeholder="010-0000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className={s.formRow}>
              <div className={s.formGroupFull}>
                <label className={`${s.label} ${s.labelRequired}`}>
                  전문가 요약 (Summary)
                </label>
                <textarea
                  className={s.textareaLarge}
                  placeholder="자신의 핵심 역량과 가치관을 3~4줄 내외로 요약해주세요."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  maxLength={500}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span className={s.hint}>
                    최소 100자 이상 입력을 권장합니다.
                  </span>
                  <span className={s.charCount}>{summary.length} / 500</span>
                </div>
              </div>
            </div>
          </section>

          {/* 경력 사항 */}
          <section
            id="portfolio-step-1"
            className={`${s.card} ${s.scrollAnchor}`}
          >
            <div className={s.cardHeader}>
              <h3 className={s.cardTitle}>경력 사항</h3>
              <button type="button" className={s.addBtn} onClick={addCareer}>
                + 추가하기
              </button>
            </div>

            {careers.map((career) => (
              <div key={career.id} className={s.careerItem}>
                {careers.length > 1 && (
                  <button
                    type="button"
                    className={s.deleteBtn}
                    onClick={() => removeCareer(career.id)}
                    aria-label="경력 항목 삭제"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14" />
                    </svg>
                  </button>
                )}

                <div className={s.formRow}>
                  <div className={s.formGroup}>
                    <label className={s.label}>회사명</label>
                    <input
                      className={s.input}
                      placeholder="회사명을 입력하세요"
                      value={career.company}
                      onChange={(e) =>
                        updateCareer(career.id, "company", e.target.value)
                      }
                    />
                  </div>
                  <div className={s.formGroup}>
                    <label className={s.label}>직위 / 역할</label>
                    <input
                      className={s.input}
                      placeholder="예: 시니어 UI 디자이너"
                      value={career.role}
                      onChange={(e) =>
                        updateCareer(career.id, "role", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className={s.formRow} style={{ marginBottom: 12 }}>
                  <div className={s.formGroup}>
                    <label className={s.label}>재직 기간</label>
                    <div className={s.dateRow}>
                      <input
                        className={s.dateInput}
                        type="month"
                        value={career.startDate}
                        onChange={(e) =>
                          updateCareer(career.id, "startDate", e.target.value)
                        }
                      />
                      <span className={s.dateSep}>~</span>
                      <input
                        className={s.dateInput}
                        type="month"
                        value={career.endDate}
                        disabled={career.isCurrent}
                        onChange={(e) =>
                          updateCareer(career.id, "endDate", e.target.value)
                        }
                      />
                      <label className={s.checkboxRow}>
                        <input
                          type="checkbox"
                          checked={career.isCurrent}
                          onChange={(e) =>
                            updateCareer(
                              career.id,
                              "isCurrent",
                              e.target.checked,
                            )
                          }
                        />
                        현재 재직 중
                      </label>
                    </div>
                  </div>
                </div>

                <div className={s.formRow} style={{ marginBottom: 0 }}>
                  <div className={s.formGroupFull}>
                    <label className={s.label}>주요 성과 및 업무 내용</label>
                    <textarea
                      className={s.textarea}
                      placeholder="담당했던 업무와 수치로 표현 가능한 성과를 입력하세요."
                      value={career.description}
                      onChange={(e) =>
                        updateCareer(career.id, "description", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* 보유 기술 */}
          <section
            id="portfolio-step-2"
            className={`${s.card} ${s.scrollAnchor}`}
          >
            <div className={s.cardHeader}>
              <h3 className={s.cardTitle}>보유 기술</h3>
            </div>

            <label className={s.label}>기술 스택 (최대 10개)</label>
            <div className={s.tagInputWrap} style={{ marginTop: 8 }}>
              {skills.map((skill) => (
                <span key={skill} className={s.tag}>
                  {skill}
                  <button
                    type="button"
                    className={s.tagRemove}
                    onClick={() => removeSkill(skill)}
                    aria-label={`${skill} 삭제`}
                  >
                    x
                  </button>
                </span>
              ))}
              <input
                className={s.tagInput}
                placeholder="기술 입력 후 Enter"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
              />
            </div>

            <div className={s.suggestedSkills}>
              {SUGGESTED_SKILLS.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  className={s.suggestedSkill}
                  onClick={() => addSuggestedSkill(skill)}
                >
                  {skill}
                </button>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Bottom Actions */}
      <div className={s.bottomActions}>
        <button type="button" className={s.btnOutline}>
          임시 저장
        </button>
        <button type="button" className={s.btnDark}>
          미리보기
        </button>
        <button
          type="button"
          className={s.btnPrimary}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "저장 중..." : "다음 단계로 이동"}
        </button>
      </div>

      <Footer />
    </div>
  );
}
