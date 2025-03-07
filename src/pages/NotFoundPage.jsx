import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { IoHomeOutline } from "react-icons/io5";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center gap-y-8 h-screen">
      <h2 className="text-2xl text-red-600 font-semibold">
        404 - Page not found
      </h2>
      <Button onClick={() => navigate("/")}>
        <IoHomeOutline size={24} />
        Home
      </Button>
    </div>
  );
}
