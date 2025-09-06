import { getRegularMain, getRegularMypage } from "@/api/authenticated/regular";
import { queryOptions } from "@tanstack/react-query";

export const getRegularMainOptions = () => {
  return queryOptions({
    queryKey: ["regular", "main"],
    queryFn: () => getRegularMain(),
  });
};

export const getRegularMypageOptions = () => {
  return queryOptions({
    queryKey: ["regular", "mypage"],
    queryFn: () => getRegularMypage(),
  });
};
