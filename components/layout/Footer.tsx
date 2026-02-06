import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Compass, Instagram, Youtube, Mail, ChevronDown } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          <div className="space-y-4 max-w-sm">
            <div className="flex items-center gap-2 text-white">
              <Compass className="h-6 w-6" />
              <span className="text-xl font-bold">Comp-Pass</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              단순한 취업 지원을 넘어, 당신의 커리어 여정을 함께하는 동반자.
            </p>
            <div className="flex gap-4 pt-2">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400"
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400"
              >
                <Youtube className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
            <div className="space-y-4">
              <h4 className="font-bold text-white">서비스</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white">
                    AI 역량진단
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    포트폴리오 분석
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    AI 모의면접
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    현직자 커뮤니티
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-white">고객지원</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white">
                    자주 묻는 질문
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    공지사항
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    1:1 문의
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    이용약관
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-white">회사</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white">
                    팀 소개
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    채용 정보
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    비즈니스 협업
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    개인정보처리방침
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 Comp-Pass Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
