import { atom } from "jotai";
import { atomWithMutation, queryClientAtom } from "jotai-tanstack-query";

import { postIngredientToMyTteokguk, postIngredientToOthersTtoekguk } from "@/apis/ingredient";

import { IngredientKey } from "@/types/ingredient";
import {
  PostIngredientToMyTteokgukRequest,
  PostIngredientToMyTteokgukResponse,
  PostIngredientToOthersTteokgukRequest,
} from "@/types/ingredient.dto";

const MAX_CHOOSE_INGREDIENT = 5;

export const $selectedIngredients = atom<IngredientKey[]>([]);
export const $updateSelectedIngredients = atom(
  (get) => get($selectedIngredients),
  (get, set, ingredientKey: IngredientKey | []) => {
    if (Array.isArray(ingredientKey)) {
      set($selectedIngredients, ingredientKey);
      return;
    }

    const selectedIngredients = get($selectedIngredients);
    const isSelected = selectedIngredients.includes(ingredientKey);

    if (isSelected) {
      set(
        $selectedIngredients,
        selectedIngredients.filter((selected) => selected !== ingredientKey),
      );

      return;
    }

    if (selectedIngredients.length < MAX_CHOOSE_INGREDIENT) {
      set($selectedIngredients, [...selectedIngredients, ingredientKey]);
    }
  },
);

export const $selectedIngredient = atom<IngredientKey | null>(null);
export const $updateSelectedIngredient = atom(
  (get) => get($selectedIngredient),
  (get, set, selectedIngredient: IngredientKey | []) => {
    if (Array.isArray(selectedIngredient)) {
      set($selectedIngredients, selectedIngredient);
      return;
    }

    if (selectedIngredient === get($selectedIngredient)) {
      set($selectedIngredient, null);
      return;
    }

    set($selectedIngredient, selectedIngredient);
  },
);

export const $postIngredientsToMyTteokguk = atomWithMutation<
  PostIngredientToMyTteokgukResponse,
  PostIngredientToMyTteokgukRequest
>((get) => ({
  mutationFn: (body: PostIngredientToMyTteokgukRequest) => postIngredientToMyTteokguk(body),
  onSuccess: () => {
    get(queryClientAtom).invalidateQueries();
  },
}));

export const $postIngredientToOthersTteokguk = atomWithMutation((get) => ({
  mutationFn: (body: PostIngredientToOthersTteokgukRequest) => postIngredientToOthersTtoekguk(body),
  onSuccess: () => {
    get(queryClientAtom).invalidateQueries();
  },
}));
