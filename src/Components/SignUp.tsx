import React, { useState } from "react";
import Form from "./Form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../redux/services/auth/authApi";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [signUp] = useSignupMutation();
  const [loading, setLoading] = useState(false);



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
    setLoading(true);

    signUp(formData)
      .unwrap()
      .then((data) => {
        toast.success(data);
        navigate("/login");
      })
      .catch((err) => {
        const { data } = err;
        Object.keys(data).forEach((key) => {
          if (Array.isArray(data[key])) {
            const errorMessages = data[key][0]
              .replace("[", "")
              .replace("]", "")
              .split(", ");

            errorMessages.forEach((errorMessage: string) => {
              toast.error(errorMessage);
            });
          } else {
            toast.error(data[key]);
          }
        });
      })
      .finally(() => {
        setLoading(false);
      });

    // try {
    //   if (response.error) {
    //     const { data } = response.error;

    //     Object.keys(data).forEach((key) => {
    //       if (Array.isArray(data[key])) {
    //         // Extract error messages from the string
    //         const errorMessages = data[key][0]
    //           .replace("[", "")
    //           .replace("]", "")
    //           .split(", ");

    //         errorMessages.forEach((errorMessage) => {
    //           toast.error(errorMessage);
    //         });
    //       } else {
    //         toast.error(data[key]);
    //       }
    //     });
    //   } else {
    //     toast.success(response.data);
    //     navigate("/login");
    //   }
    // } catch (error) {
    //   toast.error(response.error.data.detail);
    // }finally{
    //   setLoading(false);
    // }
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      handleInput={handleInput}
      title={"Sign Up"}
      formData={formData}
      loading={loading}
    />
  );
};

export default SignUp;
