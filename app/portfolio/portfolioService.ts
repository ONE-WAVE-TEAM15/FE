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
    console.log(token);
    const response = await axios.post(
      `${API_BASE_URL}/users/me/portfolio`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating portfolio:", error);
    throw error;
  }
};
