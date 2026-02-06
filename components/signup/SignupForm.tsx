"use client";

import React, { useState, useCallback } from "react";
import styles from "./SignupForm.module.css";

interface FormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface TermsState {
  all: boolean;
  terms: boolean;
  privacy: boolean;
}

export default function SignupForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [terms, setTerms] = useState<TermsState>({
    all: false,
    terms: false,
    privacy: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name as keyof FormData]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  const handleAllTerms = useCallback(() => {
    const newVal = !terms.all;
    setTerms({ all: newVal, terms: newVal, privacy: newVal });
  }, [terms.all]);

  const handleIndividualTerm = useCallback(
    (key: "terms" | "privacy") => {
      const newTerms = { ...terms, [key]: !terms[key] };
      newTerms.all = newTerms.terms && newTerms.privacy;
      setTerms(newTerms);
    },
    [terms]
  );

  const validate = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요.";
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (formData.password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다.";
    } else if (
      !/(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(formData.password)
    ) {
      newErrors.password = "영문, 숫자, 특수문자를 모두 포함해주세요.";
    }

    if (!formData.passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호 확인을 입력해주세요.";
    } else if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;
      if (!terms.terms || !terms.privacy) {
        alert("필수 약관에 동의해주세요.");
        return;
      }
      alert("회원가입이 완료되었습니다!");
    },
    [validate, terms]
  );

  return (
    <div className={styles.formSection}>
      <h2 className={styles.title}>{"회원가입"}</h2>
      <p className={styles.subtitle}>
        {"Comp-Pass의 새로운 가족이 되어주세요."}
      </p>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {/* 이름 */}
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="name">
            {"이름"}
          </label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <input
              id="name"
              name="name"
              type="text"
              className={styles.input}
              placeholder="홍길동"
              value={formData.name}
              onChange={handleInputChange}
              autoComplete="name"
            />
          </div>
          {errors.name && <span className={styles.errorText}>{errors.name}</span>}
        </div>

        {/* 이메일 */}
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="email">
            {"이메일 주소"}
          </label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 6L12 13L2 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <input
              id="email"
              name="email"
              type="email"
              className={styles.input}
              placeholder="example@comp-pass.com"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="email"
            />
          </div>
          {errors.email && (
            <span className={styles.errorText}>{errors.email}</span>
          )}
        </div>

        {/* 비밀번호 */}
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="password">
            {"비밀번호"}
          </label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect
                  x="3"
                  y="11"
                  width="18"
                  height="11"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className={styles.input}
              placeholder="영문, 숫자, 특수문자 조합 8자 이상"
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="new-password"
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowPassword((p) => !p)}
              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17.94 17.94A10.07 10.07 0 0112 20C7 20 2.73 16.11 1 12C1.73 10.24 2.84 8.69 4.22 7.46M9.88 9.88A3 3 0 0014.12 14.12M1 1L23 23M10.59 10.59A3 3 0 0013.41 13.41M6.34 6.34C4.06 7.81 2.25 9.86 1 12C2.73 16.11 7 20 12 20C14.03 20 15.93 19.41 17.56 18.44M14.12 14.12L17.56 17.56"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M1 12C2.73 7.89 7 4 12 4C17 4 21.27 7.89 23 12C21.27 16.11 17 20 12 20C7 20 2.73 16.11 1 12Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
          {errors.password && (
            <span className={styles.errorText}>{errors.password}</span>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="passwordConfirm">
            {"비밀번호 확인"}
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              className={styles.inputNoIcon}
              placeholder="비밀번호를 다시 입력해주세요"
              value={formData.passwordConfirm}
              onChange={handleInputChange}
              autoComplete="new-password"
            />
          </div>
          {errors.passwordConfirm && (
            <span className={styles.errorText}>{errors.passwordConfirm}</span>
          )}
        </div>

        {/* 약관 */}
        <div className={styles.termsSection}>
          <div className={styles.allTermsBox}>
            <div
              className={styles.checkboxRow}
              onClick={handleAllTerms}
              role="checkbox"
              aria-checked={terms.all}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleAllTerms();
                }
              }}
            >
              <div
                className={
                  terms.all ? styles.checkboxChecked : styles.checkbox
                }
              >
                {terms.all && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <div>
                <div className={styles.checkboxLabel}>{"전체 약관 동의"}</div>
                <div className={styles.checkboxSublabel}>
                  {"이용약관, 개인정보 수집 및 이용, 마케팅 정보 수신(선택)에 모두 동의합니다."}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.individualTerms}>
            <div className={styles.termRow}>
              <div
                className={styles.termLeft}
                onClick={() => handleIndividualTerm("terms")}
                role="checkbox"
                aria-checked={terms.terms}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleIndividualTerm("terms");
                  }
                }}
              >
                <div
                  className={
                    terms.terms ? styles.checkboxChecked : styles.checkbox
                  }
                >
                  {terms.terms && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span className={styles.termLabel}>
                  {"이용약관 동의 (필수)"}
                </span>
              </div>
              <button type="button" className={styles.viewLink}>
                {"보기"}
              </button>
            </div>

            <div className={styles.termRow}>
              <div
                className={styles.termLeft}
                onClick={() => handleIndividualTerm("privacy")}
                role="checkbox"
                aria-checked={terms.privacy}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleIndividualTerm("privacy");
                  }
                }}
              >
                <div
                  className={
                    terms.privacy ? styles.checkboxChecked : styles.checkbox
                  }
                >
                  {terms.privacy && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span className={styles.termLabel}>
                  {"개인정보 수집 및 이용 동의 (필수)"}
                </span>
              </div>
              <button type="button" className={styles.viewLink}>
                {"보기"}
              </button>
            </div>
          </div>
        </div>

        {/* 가입 버튼 */}
        <button type="submit" className={styles.submitButton}>
          {"가입 완료"}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 6L9 17L4 12"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>

      <p className={styles.loginPrompt}>
        {"이미 계정이 있으신가요? "}
        <button type="button" className={styles.loginLink}>
          {"로그인 하기"}
        </button>
      </p>
    </div>
  );
}
