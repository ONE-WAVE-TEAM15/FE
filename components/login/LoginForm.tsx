"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import styles from "./LoginForm.module.css";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://onewave.hsh-server.com/auth/login",
        {
          email,
          password,
        },
      );

      const data = response.data;

      // 로그인 성공 처리
      // API 응답 구조(accessToken)와 유저의 요청(res.data)을 모두 고려하여 토큰 추출
      const token = data.access_token || data;
      console.log(token);

      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("accessToken", token);

      alert("로그인 성공!");
      router.push("/survey");
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("로그인에 실패했습니다. 다시 시도해주세요.");
      }
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formSection}>
      <h2 className={styles.title}>{"로그인"}</h2>
      <p className={styles.subtitle}>{"Comp-Pass에 오신 것을 환영합니다."}</p>

      <form className={styles.form} onSubmit={handleSubmit}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
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
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowPassword((p) => !p)}
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
        </div>

        <div className={styles.optionsRow}>
          <div
            className={styles.rememberMe}
            onClick={() => setRememberMe(!rememberMe)}
          >
            <div
              className={rememberMe ? styles.checkboxChecked : styles.checkbox}
            >
              {rememberMe && (
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
            <span className={styles.checkboxLabel}>{"로그인 상태 유지"}</span>
          </div>
          <Link href="#" className={styles.forgotPassword}>
            {"비밀번호를 잊으셨나요?"}
          </Link>
        </div>

        {error && <p className={styles.errorText}>{error}</p>}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </form>

      <p className={styles.signupPrompt}>
        {"아직 회원이 아니신가요? "}
        <Link href="/signup" className={styles.signupLink}>
          {"회원가입 하기"}
        </Link>
      </p>
    </div>
  );
}
