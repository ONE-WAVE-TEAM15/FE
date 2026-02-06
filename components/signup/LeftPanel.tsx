"use client";

import React from "react";
import styles from "./LeftPanel.module.css";

export default function LeftPanel() {
  return (
    <div className={styles.panel}>
      <div className={styles.mainText}>
        <h1 className={styles.heading}>
          {"성장의 시작,"}
          <br />
          {"Comp-Pass와"}
          <br />
          {"함께하세요."}
        </h1>
        <p className={styles.subtext}>
          {"꿈꾸던 기업으로의 여정,"}
          <br />
          {"가장 체계적인 로드맵을 제시해 드립니다."}
        </p>
      </div>
      <div className={styles.benefitBox}>
        <div className={styles.benefitLabel}>
          <span className={styles.dot} />
          <span className={styles.labelText}>NEW MEMBER BENEFIT</span>
        </div>
        <p className={styles.benefitDescription}>
          {'"지금 가입하시면 첫 AI 모의 면접 리포트를 무료로 제공해 드립니다."'}
        </p>
      </div>
    </div>
  );
}
