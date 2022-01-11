import React from "react";
import { BiLogIn, BiUserPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  const navigate = useNavigate();

  return (
    <div className="container p-10 mt-10 max-w-5xl text-center mx-auto w-full">
      <div className="text-3xl font-bold mb-10">Mindney</div>
      <div className="inline-flex space-x-10 mx-auto">
        <button
          className="bg-white hover:bg-gray-50 font-bold text-xl py-16 px-20 rounded-md shadow-md inline-flex space-x-2 items-center text-center"
          onClick={() => navigate("/register")}
        >
          <BiUserPlus size={22} />
          <span>Register</span>
        </button>
        <button
          className="bg-white hover:bg-gray-50 font-bold text-xl py-16 px-20 rounded-md shadow-md inline-flex space-x-2 items-center text-center"
          onClick={() => navigate("/login")}
        >
          <BiLogIn size={21} />
          <span>Login</span>
        </button>
      </div>
    </div>
  );
};
