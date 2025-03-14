import GoalList from "@/components/goal/GoalList";
import GoalsForm from "@/components/goal/GoalsForm";

export default function GoalsPage() {
  return (
    <div className="flex flex-col gap-y-12">
      <GoalsForm />
      <GoalList />
    </div>
  );
}
