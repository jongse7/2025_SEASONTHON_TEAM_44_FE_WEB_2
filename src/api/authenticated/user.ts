import {
  GetUserLocationSchema,
  GetUserMeSimpleSchema,
  PostUserLocationSchema,
  type GetUserLocation,
  type GetUserMeSimple,
} from "@/schema/api/user";
import { authenticatedApi } from "./instance";

export const getUserLocation = async (): Promise<GetUserLocation> => {
  const response = await authenticatedApi.get("user/location").json();
  return GetUserLocationSchema.parse(response);
};

export const postUserLocation = async (region: string) => {
  const response = await authenticatedApi
    .post("user/location", {
      json: {
        region,
      },
    })
    .json();
  return PostUserLocationSchema.parse(response);
};

export const getUserMeSimple = async (): Promise<GetUserMeSimple> => {
  const response = await authenticatedApi.get("user/me/simple").json();
  return GetUserMeSimpleSchema.parse(response);
};
