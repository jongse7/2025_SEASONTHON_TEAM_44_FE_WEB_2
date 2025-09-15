import { getStoreRegular } from "@/api/authenticated/store";
import { queryOptions } from "@tanstack/react-query";

export const getStoreRegularOptions = (storeId: number) => {
  return queryOptions({
    queryKey: ["regular", storeId],
    queryFn: () => getStoreRegular(storeId),
  });
};
