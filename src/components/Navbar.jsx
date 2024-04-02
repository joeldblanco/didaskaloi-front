import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faCog,
  faFileAlt,
  faHome,
  faMapMarkerAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed w-screen bottom-0 h-16">
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-[var(--primary-color)] text-white p-1 rounded-full w-10 h-10 my-1 text-center leading-loose"
              : "bg-[var(--gray-2)] text-gray-400 p-1 rounded-full w-10 h-10 my-1 text-center leading-loose"
          }
        >
          <FontAwesomeIcon icon={faHome} />
        </NavLink>
        <NavLink
          to="/classes"
          className={({ isActive }) =>
            isActive
              ? "bg-[var(--primary-color)] text-white p-1 rounded-full w-10 h-10 my-1 text-center leading-loose"
              : "bg-[var(--gray-2)] text-gray-400 p-1 rounded-full w-10 h-10 my-1 text-center leading-loose"
          }
        >
          <FontAwesomeIcon icon={faBookOpen} />
        </NavLink>
        {/* <NavLink
          to="/locations"
          className={({ isActive }) =>
            isActive
              ? "bg-[var(--primary-color)] text-white p-1 rounded-full w-10 h-10 my-1 text-center leading-loose"
              : "bg-[var(--gray-2)] text-gray-400 p-1 rounded-full w-10 h-10 my-1 text-center leading-loose"
          }
        >
          <FontAwesomeIcon icon={faMapMarkerAlt} />
        </NavLink> */}
        <NavLink
          to="/students"
          className={({ isActive }) =>
            isActive
              ? "bg-[var(--primary-color)] text-white p-1 rounded-full w-10 h-10 my-1 text-center leading-loose"
              : "bg-[var(--gray-2)] text-gray-400 p-1 rounded-full w-10 h-10 my-1 text-center leading-loose"
          }
        >
          <FontAwesomeIcon icon={faUsers} />
        </NavLink>
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            isActive
              ? "bg-[var(--primary-color)] text-white p-1 rounded-full w-10 h-10 my-1 text-center leading-loose"
              : "bg-[var(--gray-2)] text-gray-400 p-1 rounded-full w-10 h-10 my-1 text-center leading-loose"
          }
        >
          <FontAwesomeIcon icon={faFileAlt} />
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? "bg-[var(--primary-color)] text-white p-1 rounded-full w-10 h-10 my-1 text-center leading-loose"
              : "bg-[var(--gray-2)] text-gray-400 p-1 rounded-full w-10 h-10 my-1 text-center leading-loose"
          }
        >
          <FontAwesomeIcon icon={faCog} />
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
