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
  requiredIngredients: IngredientKey[];
  backgroundColor: TteokgukBackgroudColor;
  frontGarnish: IngredientKey;
  backGarnish: IngredientKey;
  hasIngredient: boolean;
}

export interface UserTteokguk {
  tteokgukId: number;
  wish: string;
  completion: boolean;
  access: boolean;
  tteokgukIngredients: IngredientKey[];
  backgroundColor: TteokgukBackgroudColor;
  frontGarnish: IngredientKey;
  backGarnish: IngredientKey;
}

export type TteokgukBackgroudColor = "BLUE" | "GREEN" | "PINK" | "YELLOW";
