import {
  getCallbackResponseSchema,
  type GetCallbackResponse,
} from "@/schema/api/auth";
import { api } from "./instance";

/**
 * 카카오 로그인 콜백 처리
 * @param code - 카카오에서 받은 인증 코드
 * @returns Promise<KakaoCallback> - 액세스 토큰
 */
export const getCallback = async (
  code: string
): Promise<GetCallbackResponse> => {
  try {
    const response = await api
      .get("auth/kakao/exchange", {
        searchParams: { code },
      })
      .json();

    return getCallbackResponseSchema.parse(response);
  } catch (error) {
    console.error("카카오 콜백 API 호출 실패:", error);
    throw error;
  }
};
