import Spendings from "../components/spendings/Spendings";
import SpendingsList from "../components/spendings/SpendingsList";

export default function SpendingsPage() {
  return (
    <div className="flex flex-col gap-y-12 px-8 py-4 pb-8 w-full">
      <Spendings></Spendings>
      <SpendingsList></SpendingsList>
    </div>
  );
}