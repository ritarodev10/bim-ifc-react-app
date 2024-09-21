import { Link } from "react-router-dom";
import { UserIdOutlineIcon, HomeOutlineIcon } from "../Icons";

const Navbar = ({ isCollapsed }: { isCollapsed: boolean }) => {
  return (
    <div
      className={`fixed top-0 ${
        isCollapsed ? "w-[calc(100%-88px)]" : "w-[calc(100%-240px)]"
      } right-0 h-16 bg-white/30 backdrop-blur-md border-b border-primary/30 z-10 transition-all duration-300`}
    >
      <div className="navbar-container h-full py-4 flex justify-between items-center px-8">
        <div className="navbar-logo flex items-center gap-2"></div>
        <div className="navbar-menu">
          <ul className="flex items-center gap-4">
            <li>
              <Link to="/" className="flex items-center text-primary gap-2">
                <HomeOutlineIcon className="w-6 h-6 " />
                <span className="text-sm">Home</span>
              </Link>
            </li>
            <li>
              <div className="cursor-pointer text-primary flex items-center gap-2">
                <UserIdOutlineIcon className="w-6 h-6" />
                <span className="text-sm">About</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
