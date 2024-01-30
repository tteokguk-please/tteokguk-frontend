import * as IngredientIcon40 from "@/assets/svg/ingredients-40";
import * as IngredientIcon80 from "@/assets/svg/ingredients-80";
import * as IngredientIconDisabled from "@/assets/svg/ingredients-disabled";

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

export const INGREDIENT_NAME_BY_KEY = {
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

export const INGREDIENT_ICON_BY_KEY = {
  40: {
    RICE_CAKE: IngredientIcon40.RICE_CAKE,
    EGG: IngredientIcon40.EGG,
    SEAWEED: IngredientIcon40.SEAWEED,
    GREEN_ONION: IngredientIcon40.GREEN_ONION,
    BEEF: IngredientIcon40.BEEF,
    MUSHROOM: IngredientIcon40.MUSHROOM,
    TOFU: IngredientIcon40.TOFU,
    FISH_CAKE: IngredientIcon40.FISH_CAKE,
    CANDY: IngredientIcon40.CANDY,
    DUMPLING: IngredientIcon40.DUMPLING,
    TAIYAKI: IngredientIcon40.TAIYAKI,
    GARLIC: IngredientIcon40.GARLIC,
  },
  80: {
    RICE_CAKE: IngredientIcon80.RICE_CAKE,
    EGG: IngredientIcon80.EGG,
    SEAWEED: IngredientIcon80.SEAWEED,
    GREEN_ONION: IngredientIcon80.GREEN_ONION,
    BEEF: IngredientIcon80.BEEF,
    MUSHROOM: IngredientIcon80.MUSHROOM,
    TOFU: IngredientIcon80.TOFU,
    FISH_CAKE: IngredientIcon80.FISH_CAKE,
    CANDY: IngredientIcon80.CANDY,
    DUMPLING: IngredientIcon80.DUMPLING,
    TAIYAKI: IngredientIcon80.TAIYAKI,
    GARLIC: IngredientIcon80.GARLIC,
  },
  disabled: {
    RICE_CAKE: IngredientIconDisabled.RICE_CAKE,
    EGG: IngredientIconDisabled.EGG,
    SEAWEED: IngredientIconDisabled.SEAWEED,
    GREEN_ONION: IngredientIconDisabled.GREEN_ONION,
    BEEF: IngredientIconDisabled.BEEF,
    MUSHROOM: IngredientIconDisabled.MUSHROOM,
    TOFU: IngredientIconDisabled.TOFU,
    FISH_CAKE: IngredientIconDisabled.FISH_CAKE,
    CANDY: IngredientIconDisabled.CANDY,
    DUMPLING: IngredientIconDisabled.DUMPLING,
    TAIYAKI: IngredientIconDisabled.TAIYAKI,
    GARLIC: IngredientIconDisabled.GARLIC,
  },
};
