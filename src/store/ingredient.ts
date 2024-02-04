import { atom } from "jotai";

import { IngredientKey } from "@/types/ingredient";

const MAX_CHOOSE_INGREDIENT = 5;

export const $selectedIngredients = atom<IngredientKey[]>([]);

export const $updateSelectedIngredients = atom(
  (get) => get($selectedIngredients),
  (get, set, name: IngredientKey) => {
    const selectedIngredients = get($selectedIngredients);
    const isSelected = selectedIngredients.includes(name);

    if (isSelected) {
      set(
        $selectedIngredients,
        selectedIngredients.filter((selected) => selected !== name),
      );

      return;
    }

    if (selectedIngredients.length < MAX_CHOOSE_INGREDIENT) {
      set($selectedIngredients, [...selectedIngredients, name]);
    }
  },
);
