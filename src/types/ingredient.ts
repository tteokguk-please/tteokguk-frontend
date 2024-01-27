import { INGREDIENTS } from "@/constants/ingredient";

export type IngredientName = (typeof INGREDIENTS)[keyof typeof INGREDIENTS];
