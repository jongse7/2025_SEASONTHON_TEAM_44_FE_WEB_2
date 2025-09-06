import { getUserLocation, getUserMeSimple } from "@/api/authenticated/user";
import { getCallback } from "@/api/auth";
import { queryOptions } from "@tanstack/react-query";

export const getUserLocationOptions = () => {
  return queryOptions({
    queryKey: ["user", "location"],
    queryFn: () => getUserLocation(),
  });
};

export const getCallbackOptions = (code: string) => {
  return queryOptions({
    queryKey: ["auth", "callback", code],
    queryFn: () => getCallback(code),
    enabled: !!code,
    retry: false,
    staleTime: Infinity,
  });
};

export const getUserMeSimpleOptions = () => {
  return queryOptions({
    queryKey: ["userInfo"],
    queryFn: () => getUserMeSimple(),
  });
};
