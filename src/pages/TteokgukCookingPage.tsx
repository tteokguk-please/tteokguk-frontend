import { ChangeEvent, FormEvent, ReactNode, useState } from "react";

import { useAtomValue } from "jotai";

import { css } from "@styled-system/css";

import { IngredientKey } from "@/types/ingredient";
import { PostTteokgukResponse } from "@/types/tteokguk";

import useRouter from "@/routes/useRouter";
import { $postTteokguk } from "@/store/tteokguk";
import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import Ingredient from "@/components/common/Ingredient";
import WishIcon from "@/assets/svg/wish.svg";
import MeterialIcon from "@/assets/svg/material.svg";
import DumplingIcon from "@/assets/svg/dumpling.svg";
import CheckIcon from "@/assets/svg/check.svg";
import NoCheckIcon from "@/assets/svg/no-check.svg";

interface IngredientItem {
  name: IngredientKey;
  icon: ReactNode;
  label: string;
}

const MAX_CHARACTERS = 100;
const MAX_INGREDIENTS = 5;

const ingredients: IngredientItem[] = [
  {
    name: "RICE_CAKE",
    icon: <DumplingIcon />,
    label: "희망떡",
  },
  {
    name: "EGG",
    icon: <DumplingIcon />,
    label: "사랑계란",
  },
  {
    name: "SEAWEED",
    icon: <DumplingIcon />,
    label: "해피김",
  },
  {
    name: "GREEN_ONION",
    icon: <DumplingIcon />,
    label: "행운파",
  },
  {
    name: "BEEF",
    icon: <DumplingIcon />,
    label: "튼튼고기",
  },
  {
    name: "MUSHROOM",
    icon: <DumplingIcon />,
    label: "용기버섯",
  },
  {
    name: "TOFU",
    icon: <DumplingIcon />,
    label: "스마일두부",
  },
  {
    name: "FISH_CAKE",
    icon: <DumplingIcon />,
    label: "응원어묵",
  },
  {
    name: "CANDY",
    icon: <DumplingIcon />,
    label: "일등사탕",
  },
  {
    name: "DUMPLING",
    icon: <DumplingIcon />,
    label: "당첨만두",
  },
  {
    name: "TAIYAKI",
    icon: <DumplingIcon />,
    label: "금붕어빵",
  },
  {
    name: "GARLIC",
    icon: <DumplingIcon />,
    label: "성공마늘",
  },
];

const TteokgukCookingPage = () => {
  const router = useRouter();
  const { mutate: createTteokguk } = useAtomValue($postTteokguk);

  const [wish, setWish] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<IngredientKey[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);

  const handleCheckboxChange = () => {
    setIsPrivate(!isPrivate);
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setWish(event.target.value);
  };

  const handleClickIngredient = (name: IngredientKey) => () => {
    setSelectedIngredients((previousSelected) => {
      const isSelected = previousSelected.includes(name);

      if (isSelected) {
        return previousSelected.filter((selectedLabel) => selectedLabel !== name);
      }

      return previousSelected.length < 5 ? [...previousSelected, name] : previousSelected;
    });
  };

  const handleSubmitForm = (event: FormEvent) => {
    event.preventDefault();

    createTteokguk(
      {
        wish,
        ingredients: selectedIngredients,
        access: isPrivate,
      },
      {
        onSuccess: (createdTteokguk: PostTteokgukResponse) => {
          const { tteokgukId } = createdTteokguk;

          router.push(`/tteokguks/${tteokgukId}`);
        },
      },
    );
  };

  return (
    <div>
      <Header hasPreviousPage actionIcon="guide">
        떡국 만들기
      </Header>
      <div className={styles.container}>
        <div className={styles.title}>
          <WishIcon />
          나의 새해 소원
        </div>
        <form onSubmit={handleSubmitForm} className={styles.textareaContainer}>
          <textarea
            onChange={handleTextChange}
            placeholder="이루고 싶은 소원을 입력하세요."
            maxLength={MAX_CHARACTERS}
            className={styles.wisharea}
          />
          <div className={styles.charCount}>
            {wish.length}/{MAX_CHARACTERS}
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
            {ingredients.map(({ name, icon, label }, index) => (
              <Ingredient
                key={`${index}-${name}`}
                ingredientIcon={icon}
                label={label}
                onClick={handleClickIngredient(name)}
                isSelected={selectedIngredients.includes(name)}
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
            disabled={!wish || selectedIngredients.length !== MAX_INGREDIENTS}
            color="primary.45"
            applyColorTo="outline"
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
    width: "100%",
    minHeight: "calc(100% - 4.8rem)",
    backgroundColor: "back",
    paddingX: "2.4rem",
  }),
  image: css({
    height: "8.4rem",
    border: "0.1rem solid",
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
    height: "16.9rem",
  }),
  wisharea: css({
    width: "100%",
    height: "100%",
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
    bottom: "1rem",
    fontSize: "1.2rem",
    color: "gray.50",
  }),
  meterialContainer: css({
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "1.8rem",
    height: "43.8rem",
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
  }),
};
