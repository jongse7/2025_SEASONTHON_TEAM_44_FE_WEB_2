import { authenticatedApi } from "./instance";
import {
  getRegularStoreIdDetailResponseSchema,
  getRegularMypageResponseSchema,
  type GetRegularStoreIdDetailResponseSchema,
  type GetRegularMypageResponse,
  getRegularCouponResponseSchema,
  type GetRegularCouponResponse,
  type GetRegularMainResponse,
  getRegularMainResponseSchema,
  getRegularStoreIdResponseSchema,
} from "@/schema/api/regular";

export const postRegularStoreStamp = async (storeId: number) => {
  await authenticatedApi
    .post(`regular/store/stamp`, {
      json: {
        storeId,
      },
    })
    .json();
};

export const postRegularNotiRead = async (notiId: number) => {
  await authenticatedApi
    .post(`regular/noti/read`, {
      json: {
        notiId,
      },
    })
    .json();
};

export const getRegularStoreId = async (storeId: number) => {
  const response = await authenticatedApi.get(`regular/${storeId}`).json();
  return getRegularStoreIdResponseSchema.parse(response);
};

export const postRegularStoreId = async (storeId: number) => {
  await authenticatedApi.post(`regular/${storeId}`);
};

export const postRegularCouponStampId = async (stampId: number) => {
  await authenticatedApi.post(`regular/coupon/${stampId}`).json();
};

export const getRegularStoreIdDetail = async (
  storeId: number
): Promise<GetRegularStoreIdDetailResponseSchema> => {
  const response = await authenticatedApi
    .get(`regular/${storeId}/detail`)
    .json();
  return getRegularStoreIdDetailResponseSchema.parse(response);
};

export const getRegularMypage = async (): Promise<GetRegularMypageResponse> => {
  const response = await authenticatedApi.get("regular/mypage").json();
  return getRegularMypageResponseSchema.parse(response);
};

export const getRegularMain = async (): Promise<GetRegularMainResponse> => {
  const response = await authenticatedApi.get("regular/main").json();
  return getRegularMainResponseSchema.parse(response);
};

export const getRegularCoupon = async (): Promise<GetRegularCouponResponse> => {
  const response = await authenticatedApi.get("regular/coupon").json();
  return getRegularCouponResponseSchema.parse(response);
};
