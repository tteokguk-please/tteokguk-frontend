import { ChangeEvent, useState } from "react";

import { css } from "@styled-system/css";

import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import Ingredient from "@/components/common/Ingredient";
import WishIcon from "@/assets/svg/wish.svg";
import MeterialIcon from "@/assets/svg/material.svg";
import DumplingIcon from "@/assets/svg/dumpling.svg";
import CheckIcon from "@/assets/svg/check.svg";
import NoCheckIcon from "@/assets/svg/no-check.svg";
import GuideIcon from "@/assets/svg/guide.svg";

const MAX_CHARACTERS = 100;

const TteokgukCookingPage = () => {
  const [wishText, setWishText] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleCheckboxChange = () => {
    setIsPrivate(!isPrivate);
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setWishText(event.target.value);
  };

  return (
    <div>
      <Header hasPreviousPage actionIcon={<GuideIcon />}>
        떡국 만들기
      </Header>
      <div className={styles.container}>
        <div className={styles.title}>
          <WishIcon />
          나의 새해 소원
        </div>
        <form className={styles.textareaContainer}>
          <textarea
            onChange={handleTextChange}
            placeholder="이루고 싶은 소원을 입력하세요."
            maxLength={MAX_CHARACTERS}
            className={styles.wishTextarea}
          />
          <div className={styles.charCount}>
            {wishText.length}/{MAX_CHARACTERS}
          </div>
          <div className={styles.title}>
            <MeterialIcon />
            <span>떡국 재료 추가하기</span>
          </div>
          <div className={styles.meterialContainer}>
            <Ingredient ingredientIcon={<DumplingIcon />} label="희망떡" />
            <Ingredient ingredientIcon={<DumplingIcon />} label="사랑계란" />
            <Ingredient ingredientIcon={<DumplingIcon />} label="해피김" />
            <Ingredient ingredientIcon={<DumplingIcon />} label="행운파" />
            <Ingredient ingredientIcon={<DumplingIcon />} label="튼튼고기" />
            <Ingredient ingredientIcon={<DumplingIcon />} label="용기버섯" />
            <Ingredient ingredientIcon={<DumplingIcon />} label="스마일두부" />
            <Ingredient ingredientIcon={<DumplingIcon />} label="성공마늘" />
            <Ingredient ingredientIcon={<DumplingIcon />} label="응원어묵" />
            <Ingredient ingredientIcon={<DumplingIcon />} label="일등사탕" />
            <Ingredient ingredientIcon={<DumplingIcon />} label="당첨만두" />
            <Ingredient ingredientIcon={<DumplingIcon />} label="붕어빵" />
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
          <Button color="primary.45" applyColorTo="outline">
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
  title: css({
    display: "flex",
    fontWeight: 700,
    marginTop: "1.6rem",
    marginBottom: "1rem",
  }),
  textareaContainer: css({
    position: "relative",
    height: "16.9rem",
  }),
  wishTextarea: css({
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
    flexFlow: "column wrap",
    alignItems: "center",
    gap: "2.5rem 1.8rem",
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
