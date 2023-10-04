import { Link } from "react-router-dom";

const PublicMenu = () => {
  return (
    <>
      <Link
        className=" w-fit px-8 py-1 bg-[#F0F8FF] rounded-md  font-bold"
        to={"/signup"}
      >
        <button>Sign Up</button>
      </Link>
      <Link
        className="w-fit px-9 py-1 bg-[#F0F8FF] rounded-md font-bold"
        to={"/login"}
      >
        <button>Sign In</button>
      </Link>
    </>
  );
};

export default PublicMenu;
