import { getRegularMain } from "@/api/authenticated/regular";
import { queryOptions } from "@tanstack/react-query";

export const getRegularMainOptions = () => {
  return queryOptions({
    queryKey: ["regular", "main"],
    queryFn: () => getRegularMain(),
  });
};
