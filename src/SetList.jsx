import { useBricksetQuery } from "./use-brickset-query";

export const SetList = () => {
  const { sets } = useBricksetQuery();
  return (
    <ul className="list-disc list-inside max-w-xl mx-auto">
      {sets.map((set, i) => (
        <li key={`${i}-${set.setId}`}>{set.name} {set.year}</li>
      ))}
    </ul>
  );
};
