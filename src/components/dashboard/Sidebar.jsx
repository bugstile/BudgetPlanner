import SidebarTab from "./SidebarTab";
import { GrOverview } from "react-icons/gr";
import { GoGoal } from "react-icons/go";
import { BiCategory } from "react-icons/bi";
import { LuHandCoins } from "react-icons/lu";

const LINKS = [
  {
    link: "/",
    text: "Overview",
    icon: <GrOverview size={24} />,
  },
  {
    link: "/spendings",
    text: "Spendings",
    icon: <LuHandCoins size={24} />,
  },
  {
    link: "/categories",
    text: "Categories",
    icon: <BiCategory size={24} />,
  },
  {
    link: "/goals",
    text: "Goals",
    icon: <GoGoal size={24} />,
  },
];

export default function Sidebar() {
  return (
    <nav className="px-8 pt-12 w-full max-w-[250px] bg-slate-300 h-screen">
      <ul className="flex flex-col gap-y-12">
        {LINKS.map((link, index) => {
          return (
            <SidebarTab
              key={link.link + index}
              link={link.link}
              text={link.text}
              icon={link.icon}
            />
          );
        })}
      </ul>
    </nav>
  );
}
