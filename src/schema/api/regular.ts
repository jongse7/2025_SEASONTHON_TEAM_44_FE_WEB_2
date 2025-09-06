import { z } from "zod";
import { differenceInCalendarDays, parseISO } from "date-fns";

export const getRegularStoreIdDetailResponseSchema = z.object({
  response: z.object({
    storeId: z.number(),
    storeName: z.string(),
    introduction: z.string(),
    phone: z.string(),
    address: z.string(),
    detailAddress: z.string(),
    open: z.string(),
    close: z.string(),
    imageUrl: z.string(),
    availableStamp: z.number().transform((stamp) => stamp % 10),
    latestNoti: z.object({
      id: z.number(),
      title: z.string(),
      content: z.string(),
      createdAt: z.string(),
    }),
  }),
});

export type GetRegularStoreIdDetailResponseSchema = z.infer<
  typeof getRegularStoreIdDetailResponseSchema
>;

export const getRecentStoreSchema = z.object({
  storeId: z.number(),
  storeName: z.string(),
  storeImage: z.string(),
  availableStamp: z.number().transform((stamp) => stamp % 10),
  lastVisitDate: z.string().transform((dateStr) => {
    const today = new Date();
    const visitDate = parseISO(dateStr);
    const diffDays = differenceInCalendarDays(today, visitDate);

    if (diffDays === 0) return "오늘 방문";
    if (diffDays === 1) return "어제 방문";
    return `${diffDays}일 전 방문`;
  }),
});

export const getRegularMypageResponseSchema = z.object({
  response: z.object({
    storeCount: z.number(),
    totalStamp: z.number(),
    couponCount: z.number(),
    recentStores: z.array(getRecentStoreSchema),
  }),
});

export type GetRecentStore = z.infer<typeof getRecentStoreSchema>;

export type GetRegularMypageResponse = z.infer<
  typeof getRegularMypageResponseSchema
>;

export const couponSchema = z.object({
  stampId: z.number(),
  storeId: z.number(),
  storeName: z.string(),
  storeImage: z.string(),
  availableStamp: z.number().transform((stamp) => stamp % 10),
  couponCount: z.number(),
});

export const getRegularCouponResponseSchema = z.object({
  response: z.array(couponSchema),
});

export type CouponType = z.infer<typeof couponSchema>;
export type GetRegularCouponResponse = z.infer<
  typeof getRegularCouponResponseSchema
>;

const getRegularMainStoreSchema = z.object({
  storeId: z.number(),
  storeName: z.string(),
  imageUrl: z.string(),
  lastVisit: z.string().transform((dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}/${day}`;
  }),
  visitCount: z.number(),
  availableStamp: z.number().transform((stamp) => stamp % 10),
  hasNewNoti: z.boolean(),
});

export const getRegularMainResponseSchema = z.object({
  response: z.object({
    count: z.number(),
    storeList: z.array(getRegularMainStoreSchema),
  }),
});

export type GetRegularMainResponse = z.infer<
  typeof getRegularMainResponseSchema
>;

export type GetRegularMainStore = z.infer<typeof getRegularMainStoreSchema>;

export const getRegularStoreIdResponseSchema = z.object({
  response: z.boolean(),
});
