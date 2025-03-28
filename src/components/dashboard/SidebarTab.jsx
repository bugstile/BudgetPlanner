import { NavLink } from "react-router"; // Ensure you're using react-router-dom

export default function SidebarTab({ link, text, icon }) {
  return (
    <NavLink
      to={link}
      className="flex items-center gap-x-2 transition-all duration-300 ease hover:text-primary m-1 focus:outline-none focus:ring-0 focus:text-primary"
    >
      {icon}
      <p className="text-xl font-semibold">{text}</p>
    </NavLink>
  );
}