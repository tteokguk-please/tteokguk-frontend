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
  hasIngredient: boolean;
}

export interface UserTteokguk {
  tteokgukId: number;
  wish: string;
  completion: boolean;
  access: boolean;
  tteokgukIngredients: IngredientKey[];
}
