import Header from "@/components/layout/Header";
import LeftPanel from "@/components/signup/LeftPanel";
import SignupForm from "@/components/signup/SignupForm";
import Footer from "@/components/layout/Footer";
import styles from "./signup.module.css";

export default function SignupPage() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <LeftPanel />
          <SignupForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
