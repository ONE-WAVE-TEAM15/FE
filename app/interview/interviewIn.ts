import axios from "axios";
const API_BASE_URL = "https://onewave.hsh-server.com";
// 2. Chat Interaction
export interface ChatRequest {
  conversation_hisory: [];
  user_answer: string;
}

export interface ChatResponse {
  message: string;
  audio: string;
}

export const sendChatMessage = async (
  data: ChatRequest,
): Promise<ChatResponse> => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.post(
    `${API_BASE_URL}/interview/chat/interviewer`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return response.data;
};
