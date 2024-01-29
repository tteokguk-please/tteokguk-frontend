import { KeyOf, ValueOf } from "./utils";

import { INGREDIENT_NAME_BY_KEY } from "@/constants/ingredient";

export type IngredientKey = KeyOf<typeof INGREDIENT_NAME_BY_KEY>;
export type IngredientName = ValueOf<typeof INGREDIENT_NAME_BY_KEY>;
