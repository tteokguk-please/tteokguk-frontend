import TteokgukListItem from "./TteokgukListItem";

interface Props {
  className?: string;
}

const TteokgukList = ({ className }: Props) => {
  return (
    <ul className={className}>
      {[...Array(26)].map(() => (
        <TteokgukListItem isCompleted label="완성된 떡국" />
      ))}
    </ul>
  );
};

export default TteokgukList;
