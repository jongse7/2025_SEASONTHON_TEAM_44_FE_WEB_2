import { authenticatedApi } from "@/api/authenticated/instance";
import {
  postNotiReadResponseSchema,
  type PostNotiReadResponseSchema,
} from "@/schema/api/noti";

export const postNotiRead = async (
  notiId: number
): Promise<PostNotiReadResponseSchema> => {
  const response = await authenticatedApi.post(`notis/${notiId}/read`).json();
  return postNotiReadResponseSchema.parse(response);
};
