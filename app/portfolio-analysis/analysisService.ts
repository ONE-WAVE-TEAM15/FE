import axios from "axios";

export interface RecommendedProgram {
  program_name: string;
  domain: string;
  start_date: string;
  due_date: string;
  program_skills: string;
  program_content: string;
  program_link: string;
  program_category: string;
  recommendation_reason: string;
}

export interface AnalysisResponse {
  skill_match: string;
  fit_evaluation: string;
  missing_competencies: string[];
  overall_score: number;
  recommended_programs: RecommendedProgram[];
  analyzed_project: string;
  analyzed_job: string;
}

const API_BASE_URL = "https://onewave.hsh-server.com";

/**
 * 포트폴리오 분석 결과를 받아옵니다.
 * 바디값 없이 POST 요청을 보냅니다.
 */
export const getPortfolioAnalysis = async (): Promise<AnalysisResponse> => {
  const token = localStorage.getItem("accessToken");
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  const response = await axios.post(`${API_BASE_URL}/analysis/portfolio`, "");
  return response.data;
};
