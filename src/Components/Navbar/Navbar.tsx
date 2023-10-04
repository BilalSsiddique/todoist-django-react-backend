import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/features/auth/authSlice";
import { useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";

const Navbar = () => {
  const user = useAppSelector(selectUser);
  const [isMenuToggle, setIsMenuToggle] = useState(false);

  return (
    <div
      className={`  bg-[#ADC4CE] shadow-inner ${
        !isMenuToggle && "py-4"
      }  z-0 sm:py-2 px-5 w-full `}
    >
      {/* Desktop */}
      <div className="hidden  sm:flex p-2 justify-between w-full z-0">
        <DesktopMenu user={user} />
      </div>

      {/* Mobile Menu Button */}
      {!isMenuToggle && (
        <div className="flex justify-end cursor-pointer sm:hidden">
          <button onClick={() => setIsMenuToggle(!isMenuToggle)}>
            <HiMenuAlt1 size={25} />
          </button>
        </div>
      )}

      {/* Mobile menu Popup */}
      {isMenuToggle && (
        <div className="flex flex-col bg-[#ADC4CE] shadow-inner items-start gap-8 py-20 px-10   w-fit h-full right-0 fixed z-50 sm:hidden">
          <div className="w-full flex justify-center   rounded-full">
            <img src="/logo.png" width={68} className=" " />
          </div>
          <MobileMenu
            isMenuToggle={isMenuToggle}
            setIsMenuToggle={setIsMenuToggle}
            user={user}
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
