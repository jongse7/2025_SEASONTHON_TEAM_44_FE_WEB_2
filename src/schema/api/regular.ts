import { z } from "zod";
export const getRegularStoreIdDetailResponseSchema = z.object({
  response: z.object({
    storeId: z.number(),
    storeName: z.string(),
    introduction: z.string(),
    phone: z.string(),
    address: z.string(),
    detailAddress: z.string(),
    open: z.number(),
    close: z.number(),
    imageUrl: z.string(),
    availableStamp: z.number(),
    latestNoti: z
      .object({
        id: z.number(),
        title: z.string(),
        content: z.string(),
        createdAt: z.string(),
      })
      .optional(),
  }),
});

export type GetRegularStoreIdDetailResponseSchema = z.infer<
  typeof getRegularStoreIdDetailResponseSchema
>;

export const getRegularMypageResponseSchema = z.object({
  response: z.object({
    storeCount: z.number(),
    totalStamp: z.number(),
    couponCount: z.number(),
    recentStores: z.array(
      z.object({
        storeId: z.number(),
        storeName: z.string(),
        storeImage: z.string(),
        availableStamp: z.number(),
      })
    ),
  }),
});

export type GetRegularMypageResponse = z.infer<
  typeof getRegularMypageResponseSchema
>;

export const getRegularCouponResponseSchema = z.object({
  stampId: z.number(),
  storeId: z.number(),
  storeName: z.string(),
  storeImage: z.string(),
  availableStamp: z.number(),
  couponCount: z.number(),
});

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
  availableStamp: z.number(),
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
