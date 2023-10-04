import React, { useState } from "react";
import Form from "./Form";
import { toast } from "react-toastify";
import { useLoginMutation } from "../redux/services/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setToken } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    login(formData)
      .unwrap()
      .then((data) => {
        const { user, token } = data;
        const username = user.username;
        dispatch(setToken({ token, username }));
        toast.success(`Greetings ${username}!`);
        console.log("checking");
        navigate("/home");
      })
      .catch((err) => {
        toast.error(err.data.detail);
      });
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      handleInput={handleInput}
      title={"Log In"}
      formData={formData}
      login={true} //for rendering login link or sign up link if true
    />
  );
};

export default Login;
