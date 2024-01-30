import { IngredientKey } from "./ingredient";

export interface Tteokguk {
  tteokgukId: number;
  wish: string;
  completion: boolean;
  access: boolean;
  tteokgukIngredients: IngredientKey[];
}
