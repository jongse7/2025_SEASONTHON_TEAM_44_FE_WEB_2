import { authenticatedApi } from './instance';
import {
  getStampMainResponseSchema,
  getStampStoreDetailResponseSchema,
  getStampCouponsResponseSchema,
  postStampCouponUseResponseSchema,
  getStampMypageResponseSchema,
  type GetStampMainResponseSchema,
  type GetStampStoreDetailResponseSchema,
  type GetStampCouponsResponseSchema,
  type PostStampCouponUseResponseSchema,
  type GetStampMypageResponseSchema,
  SortOption,
  CouponType,
} from '@/schema/api/stamp';

export const getStampStoreDetail = async (
  storeId: number,
): Promise<GetStampStoreDetailResponseSchema> => {
  const response = await authenticatedApi
    .get(`stamps/me/stores/${storeId}`)
    .json();
  return getStampStoreDetailResponseSchema.parse(response);
};

export const getStampMain = async (
  keyword?: string,
  sort: SortOption = SortOption.NEWEST,
): Promise<GetStampMainResponseSchema> => {
  const searchParams = new URLSearchParams();
  if (keyword) searchParams.append('keyword', keyword);
  searchParams.append('sort', sort);

  const response = await authenticatedApi
    .get(`stamps/me/main?${searchParams.toString()}`)
    .json();
  return getStampMainResponseSchema.parse(response);
};
export const getStampCoupons = async (
  type: CouponType = CouponType.OWNED,
): Promise<GetStampCouponsResponseSchema> => {
  const searchParams = new URLSearchParams();
  searchParams.append('type', type);

  const response = await authenticatedApi
    .get(`stamps/coupons?${searchParams.toString()}`)
    .json();
  return getStampCouponsResponseSchema.parse(response);
};

export const postStampCouponUse = async (
  stampId: number,
): Promise<PostStampCouponUseResponseSchema> => {
  const response = await authenticatedApi
    .post(`stamps/${stampId}/coupon`)
    .json();
  return postStampCouponUseResponseSchema.parse(response);
};

export const getStampMypage =
  async (): Promise<GetStampMypageResponseSchema> => {
    const response = await authenticatedApi.get('stamps/me/summary').json();
    return getStampMypageResponseSchema.parse(response);
  };
