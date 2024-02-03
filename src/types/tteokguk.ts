import { IngredientKey } from "./ingredient";

export interface Tteokguk {
  tteokgukId: number;
  memeberId: number;
  nickname: string;
  wish: string;
  access: boolean;
  completion: boolean;
  ingredients: IngredientKey[];
  usedIngredients: IngredientKey[];
  backgroundColor: "BLUE" | "GREEN" | "PINK" | "YELLOW";
  visibleIngredient1: IngredientKey;
  visibleIngredient2: IngredientKey;
  hasIngredient: boolean;
}

export interface UserTteokguk {
  tteokgukId: number;
  wish: string;
  completion: boolean;
  access: boolean;
  tteokgukIngredients: IngredientKey[];
  backgroundColor: "BLUE" | "GREEN" | "PINK" | "YELLOW";
  visibleIngredient1: IngredientKey;
  visibleIngredient2: IngredientKey;
}
