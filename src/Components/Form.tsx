import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import ButtonLoader from "./ButtonLoader";

interface IForm {
  handleInput: React.ChangeEventHandler<HTMLInputElement>;
  handleSubmit: React.MouseEventHandler<HTMLButtonElement>;
  title: string;
  formData: { username: string; password: string; email: string };
  login?: boolean;
  loading?: boolean;
}

const Form: React.FC<IForm> = ({
  handleInput,
  handleSubmit,
  title,
  formData,
  login = false,
  loading,
}) => {
  const [isTyping, setIsTyping] = useState(false);

  const handleInputFocus = () => {
    setIsTyping(true);
  };

  const handleInputBlur = () => {
    setIsTyping(false);
  };

  const validateFormData = login
    ? formData.password.length >= 6
    : formData.username.length >= 6 && formData.password.length >= 6;

  return (
    <div className="overflow-hidden h-screen flex w-full justify-center place-items-center ">
      <form
        action=""
        className="gap-5 shadow-2xl  text-gray-600 bg-[#ADC4CE] p-10 sm:p-16 w-full  flex justify-center flex-col sm:w-3/4 md:w-3/5 sm:mx-auto mx-2 "
      >
        <h1 className="text-3xl sm:text-4xl text-gray-600  font-bold self-center">
          {title.toUpperCase()}
        </h1>
        {!login && (
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="username" className="font-bold">
              Username
            </label>
            <input
              onChange={handleInput}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className="w-full p-1.5 rounded-sm outline-none"
              placeholder="John."
              type="text"
              name="username"
              id="username"
            />
          </div>
        )}
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <input
            onChange={handleInput}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className="w-full p-1.5 rounded-sm outline-none"
            placeholder="John@gmail.com"
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="flex flex-col gap-2 font-bold">
          <label htmlFor="password">Password</label>
          <input
            className="w-full p-1.5 rounded-sm outline-none"
            onChange={handleInput}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="*******"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div>
          {isTyping && !validateFormData && (
            <p className="text-red-500 mb-2 ">
              Username and Password should be atleast 6 characters long
            </p>
          )}
          <div className="flex flex-wrap gap-5 justify-between items-end">
            <button
              disabled={!validateFormData}
              onClick={handleSubmit}
              type="submit"
              className="self-start disabled:bg-[#cccccc] disabled:text-[#666666] disabled:border-[#999999]   rounded-sm w-fit  px-5 py-1 sm:px-8 sm:py-2 bg-gray-600 text-[#F1F0E8] font-extrabold shadow-2xl  "
            >
              {loading ? <ButtonLoader /> : title}
            </button>
            {login ? (
              <Link className="underline font-bold" to={"/signup"}>
                Sign Up ?
              </Link>
            ) : (
              <Link className="underline font-bold" to={"/login"}>
                Sign In ?
              </Link>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
