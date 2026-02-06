"use client";

import React, { useEffect, useState, type FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import styles from "./interview.module.css";

// API 함수 임포트
import { startInterview } from "./interviewStart";
import { sendChatMessage } from "./interviewIn";
import { getInterviewResult } from "./interviewMentor";

/* ─── SVG Icons ─── */
function RobotIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
    </svg>
  );
}
function MicIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  );
}
function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}
function KeyboardIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M6 8h.001" />
      <path d="M10 8h.001" />
      <path d="M14 8h.001" />
      <path d="M18 8h.001" />
      <path d="M6 12h.001" />
      <path d="M10 12h.001" />
      <path d="M14 12h.001" />
      <path d="M18 12h.001" />
      <path d="M8 16h8" />
    </svg>
  );
}
function InfoIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#888"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

/* ─── Types ─── */
interface AiMsg {
  type: "ai";
  time: string;
  text: string;
  isSpeaking?: boolean;
}
interface UserMsg {
  type: "user";
  time: string;
  text: string;
}
type ChatMessageUI = AiMsg | UserMsg;

export default function MockInterviewPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessageUI[]>([]);
  const [input, setInput] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [interviewId, setInterviewId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isLastQuestion, setIsLastQuestion] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // 자동 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // 로그인 체크 및 1. [API: startInterview] 호출
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
    } else {
      setIsLoggedIn(true);
      const init = async () => {
        try {
          setLoading(true);
          const data = await startInterview();
          setInterviewId(data.audio);
          setMessages([
            {
              type: "ai",
              time: formatTime(new Date()),
              text: data.message,
              isSpeaking: true,
            },
          ]);
        } catch (error) {
          alert("면접 세션을 시작할 수 없습니다.");
        } finally {
          setLoading(false);
        }
      };
      init();
    }
  }, [router]);

  // 타이머 로직
  useEffect(() => {
    if (!isLoggedIn || loading) return;
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 59) {
          setMinutes((m) => m + 1);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isLoggedIn, loading]);

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const period = hours < 12 ? "오전" : "오후";
    const displayHours = hours % 12 || 12;
    const mins = String(date.getMinutes()).padStart(2, "0");
    return `${period} ${displayHours}:${mins}`;
  };

  const handleSend = async (e?: FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || !interviewId || loading) return;

    const userText = input.trim();
    const currentQuestion =
      [...messages].reverse().find((m) => m.type === "ai")?.text || "";
    setInput("");

    // UI에 사용자 답변 추가
    setMessages((prev) =>
      prev
        .map((m) => (m.type === "ai" ? { ...m, isSpeaking: false } : m))
        .concat({ type: "user", time: formatTime(new Date()), text: userText }),
    );

    try {
      setLoading(true);

      if (isLastQuestion) {
        // 3. [API: getInterviewResult] 마지막 질문인 경우 결과 요청
        const result = await getInterviewResult({
          conversation_hisory: [],
          interviewer_question: currentQuestion,
          user_answer: userText,
        });

        setMessages((prev) => [
          ...prev,
          {
            type: "ai",
            time: formatTime(new Date()),
            text: "답변 감사합니다. 모든 면접 과정이 종료되었습니다. 분석 결과를 준비 중입니다...",
            isSpeaking: true,
          },
        ]);

        // 결과 페이지로 이동 (결과 데이터를 route state나 로컬스토리지에 저장 가능)
        setTimeout(() => router.push("/"), 2500);
      } else {
        // 2. [API: sendChatMessage] 일반 대화 진행
        const response = await sendChatMessage({
          conversation_hisory: [],
          user_answer: userText,
        });

        setMessages((prev) => [
          ...prev,
          {
            type: "ai",
            time: formatTime(new Date()),
            text: response.message,
            isSpeaking: true,
          },
        ]);

        if (response.audio) {
          setIsLastQuestion(true);
        }
      }
    } catch (error) {
      console.error(error);
      alert("통신 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isLoggedIn) return null;

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <div className={styles.container}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.liveIndicator}>
            <span className={styles.liveDot} /> LIVE INTERVIEW
          </div>
          <h1 className={styles.interviewTitle}>
            핀테크 도메인
            <br />
            심층 기술 면접
          </h1>
          <p className={styles.sessionInfo}>
            {new Date().toLocaleDateString()} 세션
          </p>

          <div className={styles.timerCard}>
            <p className={styles.timerLabel}>진행 시간</p>
            <div className={styles.timerDisplay}>
              <span className={styles.timerCurrent}>
                {String(minutes).padStart(2, "0")}:
                {String(seconds).padStart(2, "0")}
              </span>
              <span className={styles.timerTotal}>/ 30:00</span>
            </div>
          </div>

          <div className={styles.evalCard}>
            <p className={styles.evalTitle}>현재 평가 항목</p>
            <div className={styles.evalItem}>
              <div className={styles.evalItemHeader}>
                <span className={styles.evalItemLabel}>기술 전문성</span>
                <span className={styles.evalBadgeExcellent}>우수</span>
              </div>
              <div className={styles.progressBarBg}>
                <div
                  className={styles.progressFillRed}
                  style={{ width: "78%" }}
                />
              </div>
            </div>
            <div className={styles.evalItem}>
              <div className={styles.evalItemHeader}>
                <span className={styles.evalItemLabel}>도메인 이해도</span>
                <span className={styles.evalBadgeNormal}>보통</span>
              </div>
              <div className={styles.progressBarBg}>
                <div
                  className={styles.progressFillBlue}
                  style={{ width: "52%" }}
                />
              </div>
            </div>
          </div>

          <div className={styles.tipCard}>
            <p className={styles.tipLabel}>AI 팁</p>
            <p className={styles.tipText}>
              상세하고 구체적인 답변을 지향해 보세요. AI가 역량을 더 잘 분석할
              수 있습니다.
            </p>
          </div>
          <button
            type="button"
            className={styles.pauseBtn}
            onClick={() => router.push("/")}
          >
            면접 종료
          </button>
        </aside>

        {/* Chat Area */}
        <section className={styles.chatArea}>
          <div className={styles.chatMessages} ref={scrollRef}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={
                  msg.type === "ai" ? styles.aiMessage : styles.userMessage
                }
              >
                <div
                  className={
                    msg.type === "ai"
                      ? styles.aiMessageHeader
                      : styles.userMessageHeader
                  }
                >
                  {msg.type === "ai" ? (
                    <>
                      <div className={styles.aiAvatar}>
                        <span className={styles.aiAvatarIcon}>
                          <RobotIcon />
                        </span>
                      </div>
                      <span className={styles.aiName}>AI 면접관 Vinsign</span>
                      <span className={styles.messageTime}>{msg.time}</span>
                    </>
                  ) : (
                    <>
                      <span className={styles.userTime}>{msg.time}</span>
                      <span className={styles.userName}>나</span>
                      <div className={styles.userAvatar}>
                        <UserIcon />
                      </div>
                    </>
                  )}
                </div>
                <div
                  className={
                    msg.type === "ai" ? styles.aiBubble : styles.userBubble
                  }
                >
                  {msg.text}
                </div>
                {msg.type === "ai" && (msg as AiMsg).isSpeaking && (
                  <div className={styles.ttsIndicator}>
                    <span className={styles.ttsWave}>
                      <span className={styles.ttsBar} />
                      <span className={styles.ttsBar} />
                      <span className={styles.ttsBar} />
                    </span>
                    <span className={styles.ttsText}>
                      AI가 답변을 읽어주는 중입니다...
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <form className={styles.inputArea} onSubmit={handleSend}>
            <div className={styles.inputBox}>
              <textarea
                className={styles.inputTextarea}
                placeholder={
                  loading
                    ? "처리 중..."
                    : "답변을 입력하거나 마이크 버튼을 눌러 대답하세요..."
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={3}
                disabled={loading}
              />
              <div className={styles.inputActions}>
                <button
                  type="button"
                  className={styles.micBtn}
                  aria-label="마이크"
                >
                  <MicIcon />
                </button>
                <button
                  type="submit"
                  className={styles.sendBtn}
                  disabled={loading || !input.trim()}
                >
                  {loading ? "전송 중" : "전송"} <SendIcon />
                </button>
              </div>
            </div>
            <div className={styles.inputHints}>
              <span className={styles.hintItem}>
                <KeyboardIcon /> Enter로 전송
              </span>
              <span className={styles.hintItem}>
                <InfoIcon /> AI가 실시간으로 전문성을 분석합니다.
              </span>
            </div>
          </form>
        </section>
      </div>
      <Footer />
    </div>
  );
}
