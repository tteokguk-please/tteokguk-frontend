import { atomWithSuspenseQuery } from "jotai-tanstack-query";

import { getMyDetails } from "@/apis/user";

export const $getMyDetails = atomWithSuspenseQuery(() => ({
  queryKey: ["my-details"],
  queryFn: getMyDetails,
}));
