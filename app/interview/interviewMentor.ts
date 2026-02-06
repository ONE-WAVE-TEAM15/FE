import axios from "axios";

const API_BASE_URL = "https://onewave.hsh-server.com";

// 3. Interview Result
export interface InterviewResultRequest {
  interviewer_question: string;
  user_answer: string;
  conversation_hisory: [];
}

export interface InterviewResultResponse {
  feedback: string;
  tips: string[];
}

export const getInterviewResult = async (
  data: InterviewResultRequest,
): Promise<InterviewResultResponse> => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.post(
    `${API_BASE_URL}/interview/chat/mentor`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return response.data;
};
