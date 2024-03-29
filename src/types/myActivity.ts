import { IngredientKey } from "./ingredient";
import { TteokgukBackgroudColor } from "./tteokguk";

export interface ReceivedIngredient {
  id: number;
  senderId: number;
  nickname: string;
  ingredient: IngredientKey;
  message: string;
  access: boolean;
  supportedTteokgukId: number;
}

export interface MySupportedTteokguk {
  tteokgukId: number;
  receiverNickname: string;
  ingredients: IngredientKey[];
  completion: boolean;
  frontGarnish: IngredientKey;
  backGarnish: IngredientKey;
  backgroundColor: TteokgukBackgroudColor;
}
