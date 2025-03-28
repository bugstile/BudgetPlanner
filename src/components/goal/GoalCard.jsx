import { Button } from "@/components/ui/button";
import useDataStore from "@/hooks/useDataStore";
import useEditStore from "@/hooks/useEditStore";

export default function GoalCard({ goal }) {
  const { deleteGoal } = useDataStore();
  const { updateEditingGoal } = useEditStore();

  return (
    <div className="flex flex-col gap-y-2 p-4 shadow-md rounded-md bg-card">
      <p>
        <span className="font-semibold">{goal.startDate}</span> -&nbsp;
        <span className="font-semibold">{goal.endDate}</span>
      </p>
      <p className="font-medium card-foreground">${goal.target}</p>
      <div className="flex justify-between mt-8">
        <Button onClick={() => deleteGoal(goal.id)} variant="destructive">
          Delete
        </Button>
        <Button onClick={() => updateEditingGoal(goal)}>Edit</Button>
      </div>
    </div>
  );
}
