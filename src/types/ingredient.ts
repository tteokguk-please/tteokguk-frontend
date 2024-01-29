import { KeyOf, ValueOf } from "./utils";

import { INGREDIENT_KEYS } from "@/constants/ingredient";

export type IngredientKey = KeyOf<typeof INGREDIENT_KEYS>;
export type IngredientName = ValueOf<typeof INGREDIENT_KEYS>;
