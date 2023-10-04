// import React, { useState } from 'react'
import { GoHome } from "react-icons/go";
import { CiUser } from "react-icons/ci";
import { BiTask } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { selectUser } from "../redux/features/auth/authSlice";
import { useLogOutMutation } from "../redux/services/auth/authApi";
import { useAppSelector } from "../redux/hooks";
import { selectToken, clearToken } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SideBar = () => {
  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  const [logout] = useLogOutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logout(token);
    try {
      if (response.error) {
        toast.error(response.error.data.detail);
      } else {
        dispatch(clearToken());
        navigate("/");
        toast.success(`Logout Succcessfull !`);
        console.log("checking");
      }
    } catch (error) {
      toast.error(response.error.data.detail);
    }
  };
  return (
    <div
      className={` bg-[#ADC4CE] shadow-inner sm:w-auto shrink-0 sm:p-5 flex items-center flex-col  lg:justify-between overflow-hidden min-h-screen `}
    >
      <div className="w-full  flex justify-center   rounded-full">
        <img src="/logo.png" width={68} className=" " />
      </div>
      <div className="h-full fixed flex items-center  justify-evenly flex-col">
        <div className="  flex flex-col ">
          <NavLink
            to="/home"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "active"
                : "hover:bg-[#F0F8FF]   p-2 rounded-full"
            }
          >
            <GoHome className="cursor-pointer" size={20} />
          </NavLink>
        </div>
        <div className=" flex flex-col   ">
          <NavLink
            to={`/user/${user}/profile`}
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "active"
                : "hover:bg-[#F0F8FF] p-2 rounded-full"
            }
          >
            <CiUser className="  cursor-pointer" size={20}  />
          </NavLink>
        </div>
        <div className=" flex flex-col  ">
          <NavLink
            to={`/user/${user}/todos/all`}
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "active"
                : "hover:bg-[#F0F8FF] p-2 rounded-full"
            }
          >
            <BiTask className="cursor-pointer" size={20} />
          </NavLink>
        </div>
        <div className=" flex flex-col p-2  rounded-full">
          <NavLink
            to={`/user/${user}/settings`}
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "active"
                : "hover:bg-[#F0F8FF] p-2 rounded-full"
            }
          >
            <IoSettingsOutline className="cursor-pointer" size={20} />
          </NavLink>
        </div>
        <div
          onClick={handleLogout}
          className=" flex cursor-pointer flex-col  p-2 hover:bg-[#F0F8FF]  rounded-full"
        >
          <TbLogout size={20} />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
