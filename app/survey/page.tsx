"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";

const STEPS = [
  {
    id: "identity",
    title: "현재 어떤 단계인가요?",
    options: [
      { id: "student", label: "취업을 준비하는 대학생/취준생", icon: "🎓" },
      { id: "newcomer", label: "이직을 고민하는 1~3년차 주니어", icon: "🌱" },
      { id: "senior", label: "새로운 도전을 꿈꾸는 경력직/중장년", icon: "🚀" },
    ],
  },
  {
    id: "interest",
    title: "가장 관심 있는 직무 분야는 어디인가요?",
    options: [
      { id: "dev", label: "개발 / 데이터 / IT", icon: "💻" },
      { id: "design", label: "디자인 / UI·UX", icon: "🎨" },
      { id: "biz", label: "기획 / 마케팅 / 경영", icon: "📊" },
      { id: "etc", label: "기타 전문직", icon: "✨" },
    ],
  },
  {
    id: "goal",
    title: "Comp-Pass에서 무엇을 가장 얻고 싶으신가요?",
    options: [
      { id: "portfolio", label: "합격하는 포트폴리오 분석", icon: "📄" },
      { id: "interview", label: "실전 같은 AI 모의 면접", icon: "🎤" },
      { id: "roadmap", label: "나에게 딱 맞는 성장 로드맵", icon: "🗺️" },
    ],
  },
];

export default function SurveyPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const progress = ((currentStep + 1) / STEPS.length) * 100;
  const currentStepData = STEPS[currentStep];

  const handleOptionSelect = (optionId: string) => {
    setAnswers((prev) => ({ ...prev, [currentStepData.id]: optionId }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // 설문 완료 처리
      alert("설문이 완료되었습니다! 한번 채용공고들을 살펴보러 가볼까요?");
      router.push("/jops");
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#faf8f8]">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4 py-12 md:py-24">
        <div className="w-full max-w-2xl space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              맞춤형 가이드를 위해
              <br />
              <span className="text-primary">간단한 설문</span>을 진행합니다.
            </h1>
            <p className="text-slate-500">약 30초 정도 소요됩니다.</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-sm font-medium text-slate-400 px-1">
              <span>
                Step {currentStep + 1} of {STEPS.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-slate-200" />
          </div>

          <Card className="border-none shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-6 md:p-10 space-y-8">
              <h2 className="text-xl font-bold text-slate-800 text-center">
                {currentStepData.title}
              </h2>

              <div className="grid gap-4">
                {currentStepData.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className={`flex items-center gap-4 p-5 rounded-xl border-2 text-left transition-all duration-200 ${
                      answers[currentStepData.id] === option.id
                        ? "border-primary bg-red-50/50 shadow-md translate-y-[-2px]"
                        : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <span
                      className={`flex-1 font-semibold ${
                        answers[currentStepData.id] === option.id
                          ? "text-primary"
                          : "text-slate-700"
                      }`}
                    >
                      {option.label}
                    </span>
                    {answers[currentStepData.id] === option.id && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4">
                <Button
                  variant="ghost"
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" /> 이전 단계
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!answers[currentStepData.id]}
                  className="bg-primary hover:bg-primary/90 text-white px-8"
                >
                  {currentStep === STEPS.length - 1 ? "완료" : "다음 단계"}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-slate-400 italic">
            "작성하신 정보는 오직 맞춤형 서비스 제공을 위해서만 활용됩니다."
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
