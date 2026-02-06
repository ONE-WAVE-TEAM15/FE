import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Compass,
  BarChart,
  Handshake,
  Diamond,
  FileText,
  Search,
  Target,
  Rocket,
  HeartHandshake,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 flex flex-col items-center w-full">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-20 lg:py-28 bg-slate-50/50 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-primary tracking-wide">
                  CAREER LIFE CYCLE PARTNER
                </div>
                <h1 className="hero-headline text-4xl font-extrabold tracking-tight lg:text-5xl xl:text-6xl leading-[1.2]">
                  <span className="hero-line hero-line-1">취업의 시작부터</span>
                  <span className="hero-line hero-line-2">
                    <span className="text-primary">안착과 성장</span>까지
                  </span>
                  <span className="hero-line hero-line-3">함께합니다</span>
                </h1>
                <p className="max-w-[600px] text-slate-500 md:text-lg">
                  컴패스는 단순한 취업 지원을 넘어, 당신의 커리어 여정을 함께하는
                  동반자입니다.
                  <br />
                  성장의 관문을 넘는 가장 확실한 방법.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/signup">
                    <Button
                      size="lg"
                      className="h-12 px-8 text-base rounded-md w-full sm:w-auto"
                    >
                      무료로 커리어 진단받기
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 px-8 text-base rounded-md bg-white w-full sm:w-auto hover:bg-slate-50"
                  >
                    서비스 둘러보기
                  </Button>
                </div>
              </div>
              <div className="relative mx-auto lg:ml-auto w-full max-w-[500px] aspect-square lg:aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                {/* Hero Image Placeholder */}
                <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
                  {/* Replace with actual image */}
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-800/20 to-transparent z-10"></div>
                    <Image
                      src="/placeholder.jpg"
                      alt="Hero Image"
                      fill
                      className="object-cover"
                    />
                    {/* Compass Overlay Graphic Placeholder */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-full z-20">
                      <Compass className="w-24 h-24 text-white drop-shadow-lg animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Comp-Pass Section */}
        <section className="w-full py-16 md:py-24 bg-white flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                왜 지금 컴패스가 필요한가요?
              </h2>
              <p className="text-slate-500 md:text-lg">
                통계와 논문이 증명하는 취업 시장의 현실과 해결책
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="bg-slate-50 border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                    <BarChart className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">심각해지는 취업난</h3>
                  <p className="text-slate-500 leading-relaxed">
                    청년 및 중장년층의 구직 기간이 전년 대비 15% 증가하며, 단순
                    정보 제공 이상의 밀착 관리가 절실해졌습니다.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-50 border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                    <Handshake className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">상호작용의 힘</h3>
                  <p className="text-slate-500 leading-relaxed">
                    CRM 시스템을 통해서 사용자와 효과적으로 상호작용하며 동반자
                    역할을 수행합니다.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-50 border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                    <Diamond className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">도메인 중심 스펙</h3>
                  <p className="text-slate-500 leading-relaxed">
                    단순 자격증 나열이 아닌, 직무(Domain) 중심의 포트폴리오
                    구성만이 실질적인 합격으로 이어집니다.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section className="w-full py-16 md:py-24 bg-[#FFF5F5] flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  성공을 위한 4단계
                  <br />
                  커리어 로드맵
                </h2>
                <p className="text-slate-500 md:text-lg">
                  컴패스만의 독자적인 분석 시스템으로 앞서가세요.
                </p>
              </div>
              <div className="flex gap-2">
                {/* Navigation buttons placeholder - purely visual here */}
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-slate-200 bg-white hover:bg-slate-50"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronDown className="h-4 w-4 rotate-90" />
                </Button>
                <Button
                  size="icon"
                  className="rounded-full bg-primary hover:bg-primary/90"
                >
                  <span className="sr-only">Next</span>
                  <ChevronDown className="h-4 w-4 -rotate-90" />
                </Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-white border-none shadow-sm relative overflow-hidden group hover:translate-y-[-4px] transition-transform duration-300">
                <CardContent className="p-6 pt-12 space-y-2">
                  <div className="absolute top-6 right-6 text-6xl font-black text-slate-100 group-hover:text-red-50 transition-colors select-none">
                    01
                  </div>
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-4 relative z-10">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold relative z-10">역량 진단</h3>
                  <p className="text-sm text-slate-500 leading-relaxed relative z-10">
                    회원가입 시 정밀 설문을 통해 현재 위치를 객관적으로
                    분석합니다.
                  </p>
                  <div className="w-8 h-1 bg-primary mt-4 rounded-full"></div>
                </CardContent>
              </Card>

              <Card className="bg-white border-none shadow-sm relative overflow-hidden group hover:translate-y-[-4px] transition-transform duration-300">
                <CardContent className="p-6 pt-12 space-y-2">
                  <div className="absolute top-6 right-6 text-6xl font-black text-slate-100 group-hover:text-red-50 transition-colors select-none">
                    02
                  </div>
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-4 relative z-10">
                    <Search className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold relative z-10">
                    공고 & 포폴 분석
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed relative z-10">
                    희망 공고와 포트폴리오의 간극을 분석하여 합격 전략을
                    제시합니다.
                  </p>
                  <div className="w-8 h-1 bg-slate-200 mt-4 rounded-full"></div>
                </CardContent>
              </Card>

              <Card className="bg-white border-none shadow-sm relative overflow-hidden group hover:translate-y-[-4px] transition-transform duration-300">
                <CardContent className="p-6 pt-12 space-y-2">
                  <div className="absolute top-6 right-6 text-6xl font-black text-slate-100 group-hover:text-red-50 transition-colors select-none">
                    03
                  </div>
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-4 relative z-10">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold relative z-10">
                    도메인 스펙 제안
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed relative z-10">
                    부족한 역량을 채우기 위한 최적의 프로젝트와 교육을
                    추천합니다.
                  </p>
                  <div className="w-8 h-1 bg-slate-200 mt-4 rounded-full"></div>
                </CardContent>
              </Card>

              <Card className="bg-white border-none shadow-sm relative overflow-hidden group hover:translate-y-[-4px] transition-transform duration-300">
                <CardContent className="p-6 pt-12 space-y-2">
                  <div className="absolute top-6 right-6 text-6xl font-black text-slate-100 group-hover:text-red-50 transition-colors select-none">
                    04
                  </div>
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-4 relative z-10">
                    <Rocket className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold relative z-10">
                    취업 후 성장
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed relative z-10">
                    현직자가 되어서도 최신 기술 트렌드와 직무 역량을 책임집니다.
                  </p>
                  <div className="w-8 h-1 bg-slate-200 mt-4 rounded-full"></div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* AI Interactive Section */}
        <section className="w-full py-16 md:py-24 bg-white flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-xl overflow-hidden shadow-2xl bg-slate-900 aspect-video lg:aspect-[4/3] order-2 lg:order-1">
                {/* Placeholder for Interface Image */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <div className="w-full h-full border border-slate-700 rounded-lg flex flex-col">
                    <div className="h-10 border-b border-slate-700 flex items-center px-4 gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 flex items-center justify-center gap-8 p-8">
                      <div className="text-center">
                        <div className="w-24 h-24 rounded-full bg-indigo-500/20 border-2 border-indigo-500 mb-4 mx-auto animate-pulse"></div>
                        <p className="text-indigo-400 font-mono text-sm">
                          Interviewer
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-24 h-24 rounded-full bg-teal-500/20 border-2 border-teal-500 mb-4 mx-auto animate-pulse"></div>
                        <p className="text-teal-400 font-mono text-sm">
                          Mentor
                        </p>
                      </div>
                    </div>
                    <div className="h-32 border-t border-slate-700 bg-slate-950 p-4">
                      <div className="w-full h-full bg-slate-800/50 rounded flex items-center justify-center">
                        <div className="flex gap-1 items-end h-8">
                          {[...Array(20)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1 bg-primary"
                              style={{ height: `${Math.random() * 100}%` }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8 order-1 lg:order-2">
                <div>
                  <span className="text-primary font-bold tracking-widest text-xs mb-2 block">
                    AI INTERACTIVE SYSTEM
                  </span>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6">
                    압박 면접관과
                    <br />
                    따뜻한 멘토의 공존
                  </h2>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">면접관 Agent (Voice)</h3>
                    <p className="text-slate-500 mt-1 leading-relaxed">
                      실제 면접장과 같은 긴장감을 조성하는 음성 기반 압박 면접을
                      제공합니다. 당신의 포트폴리오를 기반으로 날카로운 질문을
                      던집니다.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-300 flex items-center justify-center text-white">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">멘토 Agent (Support)</h3>
                    <p className="text-slate-500 mt-1 leading-relaxed">
                      면접 후 멘탈 케어와 최종 피드백을 제공합니다. 강점은
                      살리고 약점은 보완하는 구체적인 가이드를 통해 자신감을
                      회복시켜 드립니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 px-4 md:px-6 flex justify-center">
          <div className="container mx-auto">
            <div className="bg-primary rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
              {/* Background Graphic Element */}
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[200%] bg-white rounded-full blur-3xl transform rotate-12"></div>
              </div>

              <div className="relative z-10 space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  지금, 당신의 새로운 커리어가 시작됩니다.
                </h2>
                <p className="text-red-100 text-lg md:text-xl max-w-2xl mx-auto">
                  컴패스와 함께라면 어떠한 허들도 넘을 수 있습니다.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                  <Link href="/signup">
                    <Button
                      size="lg"
                      className="bg-white text-primary hover:bg-slate-100 w-full sm:w-auto h-12 px-8 text-base"
                    >
                      지금 무료로 시작하기
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 bg-white/10 text-white hover:bg-white/20 w-full sm:w-auto h-12 px-8 text-base"
                  >
                    문의하기
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
