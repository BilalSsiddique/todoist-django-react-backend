import SideBar from "../Components/SideBar";
import Navbar from "./Navbar/Navbar";
import React from "react";

const AuthenticatedComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div>
      <div className="flex flex-1 ">
        <SideBar />

        <div className=" w-full">
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthenticatedComponent;
