import {
  GetUserLocationSchema,
  GetUserMeSimpleSchema,
  PostUserLocationSchema,
  type GetUserLocation,
  type GetUserMeSimple,
} from "@/schema/api/user";
import { authenticatedApi } from "./instance";

export const getUsersLocation = async (): Promise<GetUserLocation> => {
  const response = await authenticatedApi.get("users/location").json();
  return GetUserLocationSchema.parse(response);
};

export const postUsersLocation = async (region: string) => {
  const response = await authenticatedApi
    .post("users/location", {
      json: {
        region,
      },
    })
    .json();
  return PostUserLocationSchema.parse(response);
};

export const getUsersMeSimple = async (): Promise<GetUserMeSimple> => {
  const response = await authenticatedApi.get("users/me/simple").json();
  return GetUserMeSimpleSchema.parse(response);
};

export const deleteUsersMe = async () => {
  await authenticatedApi.delete("users/me");
};
