import tteokgukComplete from "@/assets/images/tteokguk-complete.png";
import tteokgukIncomplete from "@/assets/images/tteokguk-incomplete.png";

interface Props {
  completion: boolean;
}

const TteokgukImage = ({ completion }: Props) => {
  return (
    <img
      src={completion ? tteokgukComplete : tteokgukIncomplete}
      alt={completion ? "완성된 떡국" : "미완성 떡국"}
    />
  );
};

export default TteokgukImage;
