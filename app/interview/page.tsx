"use client";

import React from "react"

import { useState, type FormEvent } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import styles from "./interview.module.css";

/* ─── SVG Icons (inline) ─── */
function RobotIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M6 8h.001" /><path d="M10 8h.001" /><path d="M14 8h.001" /><path d="M18 8h.001" />
      <path d="M6 12h.001" /><path d="M10 12h.001" /><path d="M14 12h.001" /><path d="M18 12h.001" />
      <path d="M8 16h8" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

/* ─── Chat Message Types ─── */
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

type ChatMessage = AiMsg | UserMsg;

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    type: "ai",
    time: "오전 10:15",
    text: "안녕하세요 김철수 님, 오늘 핀테크 도메인 면접을 맡게 된 AI 면접관입니다. 먼저 본인이 진행했던 프로젝트 중에서 결제 시스템이나 금융 API를 활용했던 경험에 대해 간략히 소개해 주시겠어요?",
  },
  {
    type: "user",
    time: "오전 10:17",
    text: "네, 저는 지난 학기에 오픈뱅킹 API를 연동한 개인 자산 관리 서비스를 개발했습니다. 당시 20여 개의 은행 API를 통합하여 사용자의 잔액을 실시간으로 조회하고, 소비 패턴을 분석하는 기능을 구현했습니다.",
  },
  {
    type: "ai",
    time: "오전 10:18",
    text: "흥미롭네요. 그렇다면 다수의 은행 API를 연동하는 과정에서 보안 인증 방식은 어떻게 처리하셨나요? 특히 토큰 관리와 갱신 프로세스에 대해 설명해 주세요.",
    isSpeaking: true,
  },
];

export default function MockInterviewPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [minutes, setMinutes] = useState(12);
  const [seconds, setSeconds] = useState(45);

  const handleSend = (e?: FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const now = new Date();
    const timeStr = `${now.getHours() < 12 ? "오전" : "오후"} ${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, "0")}`;

    const userMsg: UserMsg = {
      type: "user",
      time: timeStr,
      text: input.trim(),
    };

    setMessages((prev) => prev.map((m) => (m.type === "ai" ? { ...m, isSpeaking: false } : m)).concat(userMsg));
    setInput("");

    /* Simulate timer advance */
    setSeconds((s) => {
      if (s >= 55) {
        setMinutes((m) => m + 1);
        return 0;
      }
      return s + 15;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const timerStr = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <div className={styles.container}>
        {/* ===== Sidebar ===== */}
        <aside className={styles.sidebar}>
          <div className={styles.liveIndicator}>
            <span className={styles.liveDot} />
            LIVE INTERVIEW
          </div>

          <h1 className={styles.interviewTitle}>
            핀테크 도메인
            <br />
            심층 기술 면접
          </h1>
          <p className={styles.sessionInfo}>2025.05.22 세션 #12</p>

          {/* Timer */}
          <div className={styles.timerCard}>
            <p className={styles.timerLabel}>진행 시간</p>
            <div className={styles.timerDisplay}>
              <span className={styles.timerCurrent}>{timerStr}</span>
              <span className={styles.timerTotal}>/ 30:00</span>
            </div>
          </div>

          {/* Evaluation */}
          <div className={styles.evalCard}>
            <p className={styles.evalTitle}>현재 평가 항목</p>

            <div className={styles.evalItem}>
              <div className={styles.evalItemHeader}>
                <span className={styles.evalItemLabel}>기술 전문성</span>
                <span className={styles.evalBadgeExcellent}>우수</span>
              </div>
              <div className={styles.progressBarBg}>
                <div className={styles.progressFillRed} style={{ width: "78%" }} />
              </div>
            </div>

            <div className={styles.evalItem}>
              <div className={styles.evalItemHeader}>
                <span className={styles.evalItemLabel}>도메인 이해도</span>
                <span className={styles.evalBadgeNormal}>보통</span>
              </div>
              <div className={styles.progressBarBg}>
                <div className={styles.progressFillBlue} style={{ width: "52%" }} />
              </div>
            </div>
          </div>

          {/* AI Tip */}
          <div className={styles.tipCard}>
            <p className={styles.tipLabel}>AI 팁</p>
            <p className={styles.tipText}>
              {'"'}보안 프로토콜{'"'}에 대한 답변 시{" "}
              <span className={styles.tipBold}>OAuth 2.0</span>과{" "}
              <span className={styles.tipBold}>PKCE</span>를 언급하면 더 좋은
              점수를 받을 수 있습니다.
            </p>
          </div>

          {/* Pause */}
          <button type="button" className={styles.pauseBtn}>
            면접 일시 중단
          </button>
        </aside>

        {/* ===== Chat Area ===== */}
        <section className={styles.chatArea}>
          <div className={styles.chatMessages}>
            {messages.map((msg, idx) => {
              if (msg.type === "ai") {
                const aiMsg = msg as AiMsg;
                return (
                  <div key={idx} className={styles.aiMessage}>
                    <div className={styles.aiMessageHeader}>
                      <div className={styles.aiAvatar}>
                        <span className={styles.aiAvatarIcon}>
                          <RobotIcon />
                        </span>
                      </div>
                      <span className={styles.aiName}>
                        AI 면접관 Vinsign
                      </span>
                      <span className={styles.messageTime}>{aiMsg.time}</span>
                    </div>
                    <div className={styles.aiBubble}>{aiMsg.text}</div>
                    {aiMsg.isSpeaking && (
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
                );
              }

              const userMsg = msg as UserMsg;
              return (
                <div key={idx} className={styles.userMessage}>
                  <div className={styles.userMessageHeader}>
                    <span className={styles.userTime}>{userMsg.time}</span>
                    <span className={styles.userName}>김철수</span>
                    <div className={styles.userAvatar}>
                      <UserIcon />
                    </div>
                  </div>
                  <div className={styles.userBubble}>{userMsg.text}</div>
                </div>
              );
            })}
          </div>

          {/* Input */}
          <form className={styles.inputArea} onSubmit={handleSend}>
            <div className={styles.inputBox}>
              <textarea
                className={styles.inputTextarea}
                placeholder="답변을 입력하거나 마이크 버튼을 눌러 음성으로 대답하세요..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={3}
              />
              <div className={styles.inputActions}>
                <button type="button" className={styles.micBtn} aria-label="마이크">
                  <MicIcon />
                </button>
                <button type="submit" className={styles.sendBtn}>
                  전송 <SendIcon />
                </button>
              </div>
            </div>
            <div className={styles.inputHints}>
              <span className={styles.hintItem}>
                <KeyboardIcon />
                Enter로 전송
              </span>
              <span className={styles.hintItem}>
                <InfoIcon />
                답변이 길어질 경우 AI가 요약하여 분석합니다.
              </span>
            </div>
          </form>
        </section>
      </div>

      <Footer />
    </div>
  );
}