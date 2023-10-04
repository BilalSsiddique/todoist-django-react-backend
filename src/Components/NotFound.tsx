import { NavLink } from "react-router-dom";
import {MdOutlineKeyboardBackspace} from 'react-icons/md'
const NotFound = () => {
  return (
    <div className="h-screen flex  items-center shadow-2xl justify-center ">
      <div className="bg-white h-3/6 w-3/6 justify-center flex flex-col items-center">
        <h1 className="text-red-500 font-bold">Route Not Found</h1>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "active"
              : "hover:bg-[#F0F8FF] p-2 rounded-full"
          }
        >
          <button className="bg-[#96B6C5] font-bold hover:text-white py-1 rounded-md px-8 flex items-center gap-5">
            <p>Back</p>
            <MdOutlineKeyboardBackspace className="cursor-pointer justify-self-end " size={20} />
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
