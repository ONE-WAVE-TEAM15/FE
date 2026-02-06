"use client";

import React from "react";
import Header from "@/components/layout/Header";
import LeftPanel from "@/components/signup/LeftPanel";
import LoginForm from "@/components/login/LoginForm";
import Footer from "@/components/layout/Footer";
import styles from "./login.module.css";

export default function LoginPage() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <LeftPanel />
          <LoginForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
