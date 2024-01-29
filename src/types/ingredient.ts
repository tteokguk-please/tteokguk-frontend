import { KeyOf, ValueOf } from "./utils";

import { INGREDIENTS_LABEL_BY_KEYS } from "@/constants/ingredient";

export type IngredientKey = KeyOf<typeof INGREDIENTS_LABEL_BY_KEYS>;
export type IngredientName = ValueOf<typeof INGREDIENTS_LABEL_BY_KEYS>;
