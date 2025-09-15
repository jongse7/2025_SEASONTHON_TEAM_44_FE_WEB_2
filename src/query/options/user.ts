import { getUsersLocation, getUsersMeSimple } from "@/api/authenticated/user";
import { kakaoLogin } from "@/api/auth";
import { queryOptions } from "@tanstack/react-query";

export const getUserLocationOptions = () => {
  return queryOptions({
    queryKey: ["user", "location"],
    queryFn: () => getUsersLocation(),
  });
};

export const kakaoLoginOptions = (code: string) => {
  return queryOptions({
    queryKey: ["auth", "callback", code],
    queryFn: () => kakaoLogin(code),
    enabled: !!code,
    retry: false,
    staleTime: Infinity,
  });
};

export const getUserMeSimpleOptions = () => {
  return queryOptions({
    queryKey: ["userInfo"],
    queryFn: () => getUsersMeSimple(),
  });
};
