import { css } from "@styled-system/css";

const PrivacyConfirmView = () => {
  return (
    <div className={styles.content}>
      <div className={styles.header}>개인정보 수집·이용 동의서 (필수)</div>
      <div className={styles.guide}>
        <span className={styles.block}>‘떡국을 부탁해’의 개인정보 수집 이용 목적은</span>다음과
        같습니다.
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>수집항목</th>
              <th>수집목적</th>
              <th>기간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>이메일</td>
              <td>회원 서비스 및 서비스 제공</td>
              <td>탈퇴 시</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.caution}>
        <span className={styles.block}>*사용자는 동의를 거부할 권리가 있으며, </span>
        필수 동의 거부 시 서비스가 제한될 수 있습니다.
      </div>
    </div>
  );
};

export default PrivacyConfirmView;

const styles = {
  content: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    paddingTop: "0.8rem",
    fontSize: "1.4rem",
  }),
  header: css({
    flex: 1,
    fontWeight: 700,
    fontSize: "1.6rem",
    textAlign: "center",
    marginBottom: "0.4rem",
  }),
  guide: css({
    marginBottom: "1.6rem",
    lineHeight: "1.68rem",
  }),
  tableContainer: css({
    borderWidth: "0.1rem",
    borderColor: "primary.45",
    borderRadius: "0.8rem",
  }),
  table: css({
    width: "26.4rem",
    height: "8rem",
    fontSize: "1.2rem",
    borderRadius: "0.8rem",
    borderCollapse: "collapse",
    backgroundColor: "white",
    "& thead th": {
      borderBottomWidth: "0.1rem",
      borderBottomColor: "primary.45",
      fontWeight: 600,
    },

    "& th, & td": {
      width: "33.33%",
      textAlign: "center",
      paddingY: "0.5rem",
      paddingX: "0.8rem",
    },
  }),
  tableHeader: css({
    borderBottom: "0.1rem solid black",
    fontWeight: 600,
  }),
  block: css({
    display: "block",
  }),
  caution: css({
    fontSize: "1.2rem",
    fontWeight: 400,
    textAlign: "center",
    marginTop: "2.4rem",
    marginBottom: "0.8rem",
  }),
};
