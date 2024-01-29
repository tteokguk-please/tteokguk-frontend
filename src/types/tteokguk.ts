import { IngredientKey } from "./ingredient";

export interface Tteokguk {
  tteokgukId: number;
  wish: string;
  access: boolean;
  tteokgukIngredients: IngredientKey[];
}
