import { IngredientKey } from "./ingredient";

export interface ReceivedIngredient {
  id: number;
  senderId: number;
  nickname: string;
  ingredient: IngredientKey;
  message: string;
  access: boolean;
}

export interface MySupportedTteokguk {
  tteokgukId: number;
  receiverNickname: string;
  ingredients: IngredientKey[];
  completion: boolean;
  frontGarnish: IngredientKey;
  backGarnish: IngredientKey;
  backgroundColor: "BLUE" | "GREEN" | "PINK" | "YELLOW";
}
