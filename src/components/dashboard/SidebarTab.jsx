import { NavLink } from "react-router"; // Ensure you're using react-router-dom

export default function SidebarTab({ link, text, icon }) {
  return (
    <NavLink
      to={link}
      className="flex items-center gap-x-2 focus:translate-y-[-1px] hover:translate-y-[-1px] transition-transform transform hover:text-primary m-1 focus:outline-none focus:ring-0 focus:text-primary"
    >
      {icon}
      <p className="text-sm sm:text-s font-semibold sm:text-xl md:text-xl ">{text}</p>
    </NavLink>
  );
}