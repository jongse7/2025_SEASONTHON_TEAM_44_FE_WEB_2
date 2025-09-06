import {
  getRegularMain,
  getRegularMypage,
  getRegularStoreIdDetail,
  getRegularCoupon,
  getRegularStoreId,
} from "@/api/authenticated/regular";
import { queryOptions } from "@tanstack/react-query";

export const getRegularMainOptions = () => {
  return queryOptions({
    queryKey: ["regular", "main"],
    queryFn: () => getRegularMain(),
  });
};

export const getRegularStoreIdOptions = (storeId: number) => {
  return queryOptions({
    queryKey: ["regular", storeId],
    queryFn: () => getRegularStoreId(storeId),
  });
};

export const getRegularMypageOptions = () => {
  return queryOptions({
    queryKey: ["regular", "mypage"],
    queryFn: () => getRegularMypage(),
  });
};

export const getRegularStoreIdDetailOptions = (storeId: number) => {
  return queryOptions({
    queryKey: ["regular", "detail", storeId],
    queryFn: () => getRegularStoreIdDetail(storeId),
  });
};

export const getRegularCouponOptions = () => {
  return queryOptions({
    queryKey: ["regular", "coupon"],
    queryFn: () => getRegularCoupon(),
  });
};
