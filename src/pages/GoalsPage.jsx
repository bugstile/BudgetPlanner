export default function GoalsPage() {
  return (
    <div className="flex flex-col gap-y-12">
      <GoalsForm />
      <GoalList />
    </div>
  );
}
