import { INGREDIENTS } from "@/constants/ingredient";
import { KeyOf, ValueOf } from "./utils";

export type IngredientKey = KeyOf<typeof INGREDIENTS>;
export type IngredientName = ValueOf<typeof INGREDIENTS>;
