"use client";

import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLeft}>
        <span className={styles.footerBrand}>Comp-Pass</span>
        <span className={styles.footerCopyright}>
          {"© 2025 Comp-Pass. All rights reserved."}
        </span>
      </div>
      <nav className={styles.footerLinks} aria-label="푸터 링크">
        <a href="#" className={styles.footerLink}>
          {"이용약관"}
        </a>
        <a href="#" className={styles.footerLink}>
          {"개인정보처리방침"}
        </a>
        <a href="#" className={styles.footerLink}>
          {"고객센터"}
        </a>
      </nav>
    </footer>
  );
}
