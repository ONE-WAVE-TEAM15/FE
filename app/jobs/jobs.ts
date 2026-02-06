import axios from "axios";
import { useEffect } from "react";

export interface Job {
  id: number;
  company: string;
  title: string;
  description: string;
  domain: string;
  skills_required: string;
}

export interface JobsResponse {
  jobs: Job[];
}

const API_BASE_URL = "https://onewave.hsh-server.com/jobs";

export const getJobs = async (domain?: string) => {
  try {
    const token = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: domain ? { domain } : {},
    };
    
    const response = await axios.get<JobsResponse>(`${API_BASE_URL}`, config);
    return response.data.jobs;
  } catch (error) {
    console.error("Error getting jobs:", error);
    throw error;
  }
};
