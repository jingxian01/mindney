import { Form, Formik } from "formik";
import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { InputField } from "../components/inputs/InputField";

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <h2 className="mt-8 text-center text-3xl font-bold">
            Sign in to your account
          </h2>
          <Formik
            initialValues={{ usernameOrEmail: "", password: "" }}
            onSubmit={(values) => console.log(values)}
          >
            <Form className="space-y-4">
              <InputField
                name="usernameOrEmail"
                label="Username or Email"
                placeholder="username or email"
                type="text"
              />
              <InputField
                name="password"
                label="Password"
                placeholder="password"
                type="password"
              />
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a
                    href="/sign-up"
                    className="font-medium text-gray-600 hover:text-gray-900"
                  >
                    Sign up
                  </a>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-gray-600 hover:text-gray-900"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div className="flex flew-row space-x-4">
                <div
                  className="inline-flex items-center w-full justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:cursor-pointer"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <FaAngleLeft size={18} />
                  Back
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Sign in
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};
