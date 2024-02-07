import { ChangeEvent, FormEvent, useState } from "react";

import { useAtomValue } from "jotai";
import { toast } from "sonner";

import { css } from "@styled-system/css";

import { IngredientKey } from "@/types/ingredient";

import useRouter from "@/routes/useRouter";
import { $postTteokguk } from "@/store/tteokguk";
import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import Ingredient from "@/components/common/Ingredient";
import WishIcon from "@/assets/svg/wish.svg";
import MeterialIcon from "@/assets/svg/material.svg";
import CheckIcon from "@/assets/svg/check.svg";
import NoCheckIcon from "@/assets/svg/no-check.svg";
import shoppingDragon from "@/assets/images/shopping-dragon.png";
import {
  INGREDIENT_ICON_BY_KEY,
  INGREDIENT_KEYS,
  INGREDIENT_NAME_BY_KEY,
} from "@/constants/ingredient";

const MAX_WISH_TEXT_LENGTH = 100;
const MAX_INGREDIENTS = 5;

const TteokgukCookingPage = () => {
  const router = useRouter();
  const { mutate: createTteokguk, isPending } = useAtomValue($postTteokguk);

  const [wishText, setWishText] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<IngredientKey[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);

  const handleCheckboxChange = () => {
    setIsPrivate(!isPrivate);
  };

  const handleChangeWishText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setWishText(event.target.value);
  };

  const handleClickIngredient = (name: IngredientKey) => () => {
    setSelectedIngredients((previousSelected) => {
      const isSelected = previousSelected.includes(name);

      if (isSelected) {
        return previousSelected.filter((selectedLabel) => selectedLabel !== name);
      }

      if (previousSelected.length === MAX_INGREDIENTS) {
        toast("선택 가능한 재료의 개수를 초과하였습니다.\n 삭제 후 다시 추가해주세요.", {
          className: styles.toast,
        });

        return previousSelected;
      }

      return [...previousSelected, name];
    });
  };

  const handleSubmitForm = (event: FormEvent) => {
    event.preventDefault();

    createTteokguk(
      {
        wish: wishText,
        ingredients: selectedIngredients,
        access: !isPrivate,
      },
      {
        onSuccess: () => {
          router.push("/tteokguks");
        },
      },
    );
  };

  return (
    <div>
      <Header showBackButton actionIcon="guide">
        떡국 만들기
      </Header>
      <div className={styles.imageContainer}>
        <img src={shoppingDragon} alt="쇼핑하는 용용이" />
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <WishIcon />
          나의 새해 소원
        </div>
        <form onSubmit={handleSubmitForm} className={styles.textareaContainer}>
          <textarea
            onChange={handleChangeWishText}
            placeholder="이루고 싶은 소원을 입력하세요."
            maxLength={MAX_WISH_TEXT_LENGTH}
            className={styles.wisharea}
          />
          <div className={styles.charCount}>
            {wishText.length}/{MAX_WISH_TEXT_LENGTH}
          </div>
          <div className={styles.titleContainer}>
            <div className={styles.title}>
              <MeterialIcon />
              <span>떡국 재료 추가하기</span>
            </div>
            <div>
              {selectedIngredients.length}/{MAX_INGREDIENTS}
            </div>
          </div>
          <div className={styles.meterialContainer}>
            {INGREDIENT_KEYS.map((key, index) => (
              <Ingredient
                key={`${index}-${key}`}
                IngredientIcon={INGREDIENT_ICON_BY_KEY[40][key]}
                name={INGREDIENT_NAME_BY_KEY[key]}
                onClick={handleClickIngredient(key)}
                isSelected={selectedIngredients.includes(key)}
              />
            ))}
          </div>
          <label htmlFor="private" className={styles.privateLabel}>
            {isPrivate ? <CheckIcon /> : <NoCheckIcon />}
            비공개로 만들기
          </label>
          <input
            id="private"
            type="checkbox"
            checked={isPrivate}
            onChange={handleCheckboxChange}
            className="a11y-hidden"
          />
          <Button
            disabled={!wishText || selectedIngredients.length !== MAX_INGREDIENTS}
            color="primary.45"
            applyColorTo="outline"
            isPending={isPending}
          >
            소원 떡국 만들기
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TteokgukCookingPage;

const styles = {
  container: css({
    height: "calc(100vh- 16.4rem)",
    backgroundColor: "back",
    paddingX: "2.4rem",
    paddingBottom: "2rem",
  }),
  imageContainer: css({
    minHeight: "11.6rem",
    maxHeight: "11.6rem",
    objectFit: "contain",
  }),
  image: css({
    height: "100%",
    width: "auto",
  }),
  titleContainer: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: "0.8rem",
  }),
  title: css({
    display: "flex",
    alignItems: "center",
    fontWeight: 700,
    marginTop: "1.6rem",
    marginBottom: "1rem",
  }),
  textareaContainer: css({
    position: "relative",
  }),
  wisharea: css({
    width: "100%",
    height: "16.9rem",
    borderWidth: "0.1rem",
    borderColor: "primary.45",
    borderRadius: "0.8rem",
    padding: "1.6rem 1.2rem 0",
    outline: "none",
    fontSize: "1.4rem",
    resize: "none",
  }),
  charCount: css({
    position: "absolute",
    right: "1.2rem",
    top: "14rem",
    fontSize: "1.2rem",
    color: "gray.50",
  }),
  meterialContainer: css({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(7.6rem, 1fr))",
    gap: "1.8rem",
    padding: "2.3rem 2.4rem",
    borderRadius: "0.8rem",
    backgroundColor: "primary.20",
  }),
  privateLabel: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.8rem",
    marginTop: "3.1rem",
    marginBottom: "1.6rem",
    cursor: "pointer",
  }),
  toast: css({
    paddingY: "1.2rem",
    whiteSpace: "pre-line",
    textAlign: "center",
  }),
  button: css({
    marginBottom: "2rem",
  }),
  lottieContainer: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  lottie: css({
    height: "2rem",
    marginRight: "0.8rem",
  }),
};
