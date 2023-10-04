import { IoNotificationsOutline } from "react-icons/io5";
import PublicMenu from "./PublicMenu";

const DesktopMenu = ({ user }: { user: string | null }) => {
  return (
    <>
      {user !== null ? (
        <input
          type="search"
          className="outline-none font-light overflow-hidden  shadow-inner placeholder:text-black rounded-md px-5 py-0"
          name="search"
          placeholder="Search..."
          id=""
        />
      ) : (
        <img src="/logo.png" width={60} className=" " />
      )}
      <div className="gap-2 flex items-center ">
        {user !== null ? (
          <>
            <IoNotificationsOutline
              className="shrink-0 cursor-pointer"
              size={25}
              color="#4B5563"
            />
            <p className="text-slate-800 font-bold">|</p>
            <div className=" shrink-0 rounded-full justify-center items-center h-8 w-8 flex shadow-2xl bg-color ">
              <p className="text-white font-bold">
                {user ? user[0].toLocaleUpperCase() : ""}
              </p>
            </div>
            <p className="font-semibold">{user ? user : ""}</p>
          </>
        ) : (
          <PublicMenu />
        )}
      </div>
    </>
  );
};

export default DesktopMenu;
