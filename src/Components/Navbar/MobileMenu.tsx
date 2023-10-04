import { IoNotificationsOutline } from "react-icons/io5";
import { GrFormClose } from "react-icons/gr";
import { SetStateAction } from "react";
import PublicMenu from "./PublicMenu";

const MobileMenu = ({
  user,
  setIsMenuToggle,
  isMenuToggle,
}: {
  user: null | string;
  setIsMenuToggle: React.Dispatch<SetStateAction<boolean>>;
  isMenuToggle: boolean;
}) => {
  return (
    <>
      {user !== null ? (
        <>
          <div className="items-center  gap-2  flex ">
            <div className=" shrink-0 rounded-full justify-center items-center h-8 w-8 flex shadow-2xl bg-[#F0F8FF] ">
              <p className="text-black font-bold">
                {user ? user[0].toLocaleUpperCase() : ""}
              </p>
            </div>
            <p className="font-semibold">{user}</p>
          </div>

          <div className="flex gap-2">
            <IoNotificationsOutline
              className="shrink-0 cursor-pointer"
              size={25}
              color="#4B5563"
            />
            <p className="font-semibold">Notifications</p>
          </div>

          <input
            type="search"
            className="outline-none font-light overflow-hidden  shadow-inner placeholder:text-black rounded-md px-5 py-0.5"
            name="search"
            placeholder="Search Task..."
            id=""
          />
        </>
      ) : (
        <div className="w-full flex justify-center items-center flex-col gap-5">
          <PublicMenu />
        </div>
      )}

      {/* absolute */}
      <GrFormClose
        onClick={() => setIsMenuToggle(!isMenuToggle)}
        className="absolute right-4 top-3 cursor-pointer"
        size={25}
      />
    </>
  );
};

export default MobileMenu;
