import { FormEvent, Fragment } from "react";

import { useAtom, useAtomValue } from "jotai";

import { css } from "@styled-system/css";

import { IngredientKey } from "@/types/ingredient";

import { Link } from "@/routes/Link";
import { $getSearchedUsers, $nickname } from "@/store/user";
import Header from "@/components/common/Header";
import Input from "@/components/common/Input";
import Loading from "@/components/common/Loading";
import { INGREDIENT_ICON_BY_KEY, INGREDIENT_NAME_BY_KEY } from "@/constants/ingredient";
import SearchIcon from "@/assets/svg/search.svg";

const SearchUserPage = () => {
  const [nickname, setNickname] = useAtom($nickname);
  const { data: searchedUsers, isLoading } = useAtomValue($getSearchedUsers(nickname));

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nickname = formData.get("nickname") as string;

    setNickname(nickname);
  };

  return (
    <Fragment>
      <Header showBackButton>검색</Header>
      <div className={styles.container}>
        <form onSubmit={handleSubmitForm} className={styles.form}>
          <label htmlFor="nickname" className="a11y-hidden">
            검색
          </label>
          <Input id="nickname" name="nickname" placeholder="찾으시는 분의 닉네임을 입력하세요" />
          <button type="submit" className={styles.searchButton}>
            <SearchIcon />
          </button>
        </form>
        {isLoading && <Loading />}
        <div>
          <ul className={styles.searchResult}>
            {searchedUsers?.length === 0 && (
              <div className={styles.noUsers}>일치하는 사용자가 없습니다.</div>
            )}
            {searchedUsers?.map(({ id, nickname, primaryIngredient }) => (
              <Ingredient key={id} id={id} nickanme={nickname} ingredientKey={primaryIngredient} />
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default SearchUserPage;

const Ingredient = ({
  id,
  nickanme,
  ingredientKey,
}: {
  id: number;
  nickanme: string;
  ingredientKey: IngredientKey;
}) => {
  const IngredientIcon = INGREDIENT_ICON_BY_KEY[40][ingredientKey];

  return (
    <li className={styles.searchList}>
      <div className={styles.searchContent}>
        <span className={styles.ingredientIcon}>
          <IngredientIcon aria-label={INGREDIENT_NAME_BY_KEY[ingredientKey]} />
        </span>
        <span>{nickanme}</span>
      </div>
      <Link to={`/users/${id}`} className={styles.visitButton}>
        <button>방문하기</button>
      </Link>
    </li>
  );
};

const styles = {
  container: css({
    paddingX: "2.4rem",
    marginTop: "0.8rem",
  }),
  form: css({
    position: "relative",
    display: "flex",
    alignItems: "center",
  }),
  searchButton: css({
    position: "absolute",
    right: "1.2rem",
  }),
  noUsers: css({
    textAlign: "center",
    marginTop: "3.2rem",
    fontWeight: 700,
  }),
  searchResult: css({
    width: "100%",
    paddingX: "0.8rem",
    "&::after": {
      content: "",
      display: "block",
      marginTop: "2rem",
      width: "100%",
      height: "0.2rem",
      backgroundColor: "primary.60",
    },
    "&:last-child::after": {
      display: "none",
    },
  }),
  searchList: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "5.2rem",
    marginY: "2rem",
    fontWeight: 700,
  }),
  searchContent: css({
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    alignItems: "center",
  }),
  ingredientIcon: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "5.2rem",
    height: "5.2rem",
    marginRight: "1rem",
    borderRadius: "50%",
    backgroundColor: "secondary.50",
  }),
  visitButton: css({
    display: "flex",
    justifyContent: "center",
    width: "6.5rem",
    height: "2.6rem",
    fontSize: "1.4rem",
    fontWeight: 400,
    backgroundColor: "primary.60",
    borderRadius: "0.4rem",
  }),
};
