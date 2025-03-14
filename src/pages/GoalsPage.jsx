import GoalList from "@/components/goal/GoalList";
import GoalsForm from "@/components/goal/GoalsForm";
import useEditStore from "@/hooks/useEditStore";

export default function GoalsPage() {
  const { editingGoal } = useEditStore();

  return (
    <div className="flex flex-col gap-y-12 p-8">
      <GoalsForm editingGoal={editingGoal} />
      <GoalList />
    </div>
  );
}
