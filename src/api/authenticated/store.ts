import { authenticatedApi } from "./instance";
import {
  postStoreVisitResponseSchema,
  postStoreRegisterResponseSchema,
  getStoreRegularResponseSchema,
  type PostStoreVisitResponseSchema,
  type PostStoreRegisterResponseSchema,
  type GetStoreRegularResponseSchema,
} from "@/schema/api/store";

export const postStoreVisit = async (
  storeId: number
): Promise<PostStoreVisitResponseSchema> => {
  const response = await authenticatedApi
    .post(`stores/${storeId}/visit`)
    .json();
  return postStoreVisitResponseSchema.parse(response);
};

export const postStoreRegister = async (
  storeId: number
): Promise<PostStoreRegisterResponseSchema> => {
  const response = await authenticatedApi
    .post(`stores/${storeId}/register`)
    .json();
  return postStoreRegisterResponseSchema.parse(response);
};

export const getStoreRegular = async (
  storeId: number
): Promise<GetStoreRegularResponseSchema> => {
  const response = await authenticatedApi
    .get(`stores/${storeId}/regular`)
    .json();
  return getStoreRegularResponseSchema.parse(response);
};
