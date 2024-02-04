import { IngredientKey } from "./ingredient";

export interface ReceivedIngredient {
  id: number;
  senderId: number;
  nickname: string;
  ingredient: IngredientKey;
  message: string;
  access: boolean;
}
