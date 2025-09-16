import {
  getStampMain,
  getStampStoreDetail,
  getStampCoupons,
  getStampMypage,
  getStampRecommend,
} from '@/api/authenticated/stamp';
import { queryOptions } from '@tanstack/react-query';
import { SortOption, CouponType } from '@/schema/api/stamp';

export const getStampMainOptions = (
  keyword?: string,
  sort: SortOption = SortOption.NEWEST,
) => {
  return queryOptions({
    queryKey: ['stamp', 'main', keyword, sort],
    queryFn: () => getStampMain(keyword, sort),
  });
};

export const getStampStoreDetailOptions = (storeId: number) => {
  return queryOptions({
    queryKey: ['stamp', 'store', 'detail', storeId],
    queryFn: () => getStampStoreDetail(storeId),
  });
};

export const getStampCouponsOptions = (type: CouponType = CouponType.OWNED) => {
  return queryOptions({
    queryKey: ['stamp', 'coupons', type],
    queryFn: () => getStampCoupons(type),
  });
};

export const getStampMypageOptions = () => {
  return queryOptions({
    queryKey: ['stamp', 'mypage'],
    queryFn: () => getStampMypage(),
  });
};

export const getStampRecommendOptions = () => {
  return queryOptions({
    queryKey: ['stamp', 'recommend'],
    queryFn: () => getStampRecommend(),
  });
};
