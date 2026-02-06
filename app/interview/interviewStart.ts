import axios from "axios";

const API_BASE_URL = "https://onewave.hsh-server.com";

// 1. Interview Start
export interface InterviewStartResponse {
  audio: string;
  message: string;
}

export const startInterview = async (): Promise<InterviewStartResponse> => {
  const token = localStorage.getItem("accessToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const survey = await axios.post(`${API_BASE_URL}/users/me/survey`, {
    domain: "BE",
    text: "string",
  });
  const response = await axios.post(`${API_BASE_URL}/interview/start`, "");
  console.log(response, survey);
  return response.data;
};
