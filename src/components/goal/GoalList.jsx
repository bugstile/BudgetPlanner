import useDataStore from "@/hooks/useDataStore";
import React from "react";
import GoalCard from "./GoalCard";

export default function GoalList() {
  const { goals } = useDataStore();
  return (
    <ul className="flex flex-wrap gap-12 p-8">
      {goals.map((goal, index) => {
        return <GoalCard key={index} goal={goal} />;
      })}
    </ul>
  );
}
