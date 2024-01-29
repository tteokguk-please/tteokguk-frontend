import { KeyOf, ValueOf } from "./utils";

import { INGREDIENTS } from "@/constants/ingredient";

export type IngredientKey = KeyOf<typeof INGREDIENTS>;
export type IngredientName = ValueOf<typeof INGREDIENTS>;
