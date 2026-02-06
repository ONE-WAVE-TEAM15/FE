# 🧭 컴패스 (Comp-Pass)

> "당신의 첫 출근부터 다음 정점까지, 끝까지 책임지는 길잡이"

컴패스(Comp-Pass)는 곁을 지키는 '동반자(Companion)'와 성장의 관문을 넘어서는 '통과(Pass)'의 의미를 결합한 커리어 라이프사이클 파트너 서비스입니다. 취업 전  
 합격을 위한 집요한 가이드부터 취업 후 직무 전문성 강화까지, 사용자의 전 생애 커리어 여정을 함께합니다.

## 주요 기능

### AI 역량 진단 및 설문

- 회원가입 시 사용자의 현재 상태(취준생, 주니어, 경력직)와 목표를 파악하기 위한 정밀 설문 진행.
- 진단 결과를 바탕으로 개인화된 서비스 경험 제공.

### 포트폴리오 정밀 분석

- 사용자의 포트폴리오 데이터를 바탕으로 직무 적합도, 역량 일치도를 수치화.
- AI가 추출한 핵심 키워드 및 강점/보완점 리포트 제공.

### 도메인 중심 스펙 제안 (Roadmap)

- 희망 직무(핀테크, 커머스 등)에 최적화된 성장 로드맵 설계.
- 부족한 역량을 채울 수 있는 최적의 교육 프로그램 및 프로젝트 추천.

### 실시간 채용 공고 큐레이션

- 사용자의 역량 데이터와 공고 데이터의 매칭률(Match %) 분석.
- 도메인 및 기술 스택별 맞춤형 필터링 지원.

### AI 모의 면접 (Interactive Interview)

- 면접관 Agent: 사용자 포트폴리오 기반의 날카로운 압박 면접(Voice/Chat) 진행.
- 멘토 Agent: 면접 종료 후 멘탈 케어 및 실질적인 개선 방향을 담은 최종 피드백 제공.

---

## 기술 스택 (Tech Stack)

- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS, CSS Modules
- Components: shadcn/ui, Lucide React (Icons)
- State & Data: Axios, React Hooks (useState, useEffect)
- Animation: CSS Keyframes (Sliding-up effects)

---

## 📂 프로젝트 구조 (Project Structure)

     1 C:\hackerton
     2 ├── app/
     3 │   ├── career-hurdle/      # 역량 진단 질문 페이지
     4 │   ├── jobs/               # 채용 공고 리스트 및 필터
     5 │   ├── interview/          # AI 모의 면접 (Start -> Chat                 -> Mentor)
     6 │   ├── portfolio/          # 포트폴리오 작성 및 저장
     7 │   ├── portfolio-analysis/ # AI 포트폴리오 분석 결과 리포트
     8 │   ├── survey/             # 신규 유저 초기 설문
     9 │   └── login / signup/     # 인증 시스템
    10 ├── components/ # 공통 레이아웃 및 UI 컴포넌트
    11 ├── hooks/ # 공통 커스텀 훅
    12 ├── lib/ # 유틸리티 함수
    13 └── public/ # 에셋 및 정적 파일

---

## 시작하기 (Getting Started)

### 설치

`pnpm install`

### 실행

`pnpm dev`

### 환경 설정

- 인증이 필요한 페이지는 localStorage의 accessToken을 참조합니다.
- 인증되지 않은 사용자는 자동으로 /login 페이지로 리다이렉트됩니다.

---

컴패스와 함께 커리어의 허들을 넘고 정점까지 도달하세요. 🧭
