import GoalList from "@/components/goal/GoalList";
import GoalsForm from "@/components/goal/GoalsForm";
import useEditStore from "@/hooks/useEditStore";

export default function GoalsPage() {
  const { editingGoal } = useEditStore();

  return (
    <div className="flex items-center flex-col w-full h-full">
      <div className="p-6 pt-12">
        <h1 className="font-semibold text-4xl">Goals</h1>
      </div>
      <div className="rounded-sm border-none flex min-h-[350px] w-full justify-center p-10 items-center">
        <div className="w-full bg-lighterBackground p-8">
          <GoalsForm editingGoal={editingGoal} />
        </div>
      </div>
      <div className="rounded-sm border-none flex min-h-[350px] w-full justify-center p-10 pt-2 items-center">
        <div className="w-full bg-lighterBackground p-8">
          <GoalList />
        </div>
      </div>
    </div>
  );
}
