import Header from "@/components/signup/Header";
import LeftPanel from "@/components/signup/LeftPanel";
import SignupForm from "@/components/signup/SignupForm";
import Footer from "@/components/signup/Footer";
import styles from "./page.module.css";

export default function Page() {
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
