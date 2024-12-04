import BestCard from "./best-card";

const DATA = ["1", "2", "3", "4", "5"];

export default function BestList() {
  return (
    <div className="mt-[24px] w-full border-t-2 border-b-gray-003 border-t-black-001">
      {DATA.map((data, index) => {
        return <BestCard key={index + 1} ranking={index + 1} />;
      })}
    </div>
  );
}