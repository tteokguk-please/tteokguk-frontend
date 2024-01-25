import classnames from "classnames";

import { css } from "@styled-system/css";

import Button from "@/components/common/Button";
import Modal from "@/components/common/modal/Modal";

interface Props {
  isOpen: boolean;
  close: () => void;
}

const PrivacyAndMarketingAgreement = ({ isOpen, close }: Props) => {
  return (
    isOpen && (
      <Modal>
        <Modal.Header className={classnames(styles.header)}>
          개인정보 수집·이용 동의서 (필수)
        </Modal.Header>
        <Modal.Body className={styles.content}>
          <div className={styles.guide}>
            ‘떡국을 부탁해’의 개인정보 수집 이용 목적은 다음과 같습니다.
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
        </Modal.Body>
        <Modal.Header className={classnames(styles.header, styles.marketingHeader)}>
          마케팅 · 홍보 활용 동의서 (선택)
        </Modal.Header>
        <Modal.Body className={styles.content}>
          <div className={styles.guide}>
            사용자가 ‘떡국을 부탁해’에서 작성한 내용은 마케팅 및 홍보에 활용 될 수 있습니다.
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
                  <td>
                    <span className={styles.block}>사용자</span> 작성 소원
                  </td>
                  <td>마케팅 및 홍보 활용</td>
                  <td>탈퇴 시</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.caution}>
            <span className={styles.block}>*사용자는 동의를 거부할 권리가 있으며, </span>
            필수 동의 거부 시 서비스가 제한될 수 있습니다.
          </div>
          <Button onClick={close} color="primary.100" applyColorTo="background">
            확인
          </Button>
        </Modal.Body>
      </Modal>
    )
  );
};

export default PrivacyAndMarketingAgreement;

const styles = {
  header: css({
    flex: 1,
    fontWeight: 700,
    fontSize: "1.6rem !important",
    textAlign: "center",
    marginBottom: "0.4rem",
  }),
  guide: css({
    marginBottom: "1.6rem",
  }),
  content: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    paddingX: "1.9rem",
    fontSize: "1.4rem",
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
  marketingHeader: css({
    marginTop: "2.4rem",
  }),
  block: css({
    display: "block",
  }),
  caution: css({
    fontSize: "1.2rem",
    fontWeight: 400,
    textAlign: "center",
    marginTop: "2.4rem",
    marginBottom: "0.6rem",
  }),
};
