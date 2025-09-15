import {
  getCallbackResponseSchema,
  type GetCallbackResponse,
} from "@/schema/api/auth";
import { api } from "./instance";

/**
 * 카카오 로그인/회원가입 처리
 * @param code - 카카오에서 받은 인증 코드
 * @returns Promise<GetCallbackResponse> - 액세스 토큰 및 리프레시 토큰
 */
export const kakaoLogin = async (
  code: string
): Promise<GetCallbackResponse> => {
  const response = await api
    .post("auth/kakao/login", {
      json: {
        code,
        role: "REGULAR",
      },
    })
    .json();

  return getCallbackResponseSchema.parse(response);
};
