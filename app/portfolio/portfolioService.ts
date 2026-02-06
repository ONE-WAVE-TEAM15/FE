import axios from "axios";
import { useEffect } from "react";

export interface PortfolioRequest {
  self_summary: string;
  user_skills: string;
  external_links: string;
  title: string;
  start_date: string;
  end_date: string;
  content: string;
  skills_used: string;
  results: string;
}

const API_BASE_URL = "https://onewave.hsh-server.com";

export const createPortfolio = async (data: PortfolioRequest) => {
  try {
    const token = localStorage.getItem("accessToken");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    const response = await axios.post(
      `${API_BASE_URL}/users/me/portfolio`,
      data,
    );
    const surveyData = await axios.post(`${API_BASE_URL}/users/me/survey`, {
      domain: "BE",
      text: "string",
    });
    return response.data;
  } catch (error) {
    console.error("Error creating portfolio:", error);
    throw error;
  }
};

/**
 * 컴포넌트의 상태 데이터를 받아 서버 스펙에 맞게 매핑 후 저장을 수행합니다.
 */
export const savePortfolio = async (data: {
  summary: string;
  skills: string[];
  job: string;
  careers: any[];
}) => {
  const firstCareer = data.careers[0] || {};
  const portfolioData: PortfolioRequest = {
    self_summary: data.summary,
    user_skills: data.skills.join(", "),
    external_links: "",
    title: data.job || "포트폴리오",
    start_date: firstCareer.startDate || "2026-02-06",
    end_date: firstCareer.isCurrent
      ? "2026-02-06"
      : firstCareer.endDate || "2026-02-06",
    content: firstCareer.description || "상세 내용",
    skills_used: data.skills.slice(0, 3).join(", "),
    results: "주요 성과 요약",
  };

  return await createPortfolio(portfolioData);
};
