import * as IngredientIcon from "@/assets/svg/ingredients";

export const INGREDIENT_KEYS = [
  "RICE_CAKE",
  "EGG",
  "SEAWEED",
  "GREEN_ONION",
  "BEEF",
  "MUSHROOM",
  "TOFU",
  "FISH_CAKE",
  "CANDY",
  "DUMPLING",
  "TAIYAKI",
  "GARLIC",
] as const;

export const INGREDIENTS_LABEL_BY_KEYS = {
  RICE_CAKE: "희망떡",
  EGG: "사랑계란",
  SEAWEED: "해피김",
  GREEN_ONION: "행운파",
  BEEF: "튼튼고기",
  MUSHROOM: "용기버섯",
  TOFU: "스마일두부",
  FISH_CAKE: "응원어묵",
  CANDY: "일등사탕",
  DUMPLING: "당첨만두",
  TAIYAKI: "금붕어빵",
  GARLIC: "성공마늘",
} as const;

export const INGREDIENTS_ICON_BY_KEYS = {
  RICE_CAKE: IngredientIcon.RICE_CAKE,
  EGG: IngredientIcon.EGG,
  SEAWEED: IngredientIcon.SEAWEED,
  GREEN_ONION: IngredientIcon.GREEN_ONION,
  BEEF: IngredientIcon.BEEF,
  MUSHROOM: IngredientIcon.MUSHROOM,
  TOFU: IngredientIcon.TOFU,
  FISH_CAKE: IngredientIcon.FISH_CAKE,
  CANDY: IngredientIcon.CANDY,
  DUMPLING: IngredientIcon.DUMPLING,
  TAIYAKI: IngredientIcon.TAIYAKI,
  GARLIC: IngredientIcon.GARLIC,
};
