import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-full p-1">
            <Compass className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900">Comp-Pass</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="#" className="hover:text-primary transition-colors">
            채용 공고
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            스펙 쌓기
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            포트폴리오 분석
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            모의면접
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-slate-600 hover:text-primary hidden sm:block"
          >
            로그인
          </Link>
          <Link href="/signup">
            <Button className="rounded-full px-6">시작하기</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
