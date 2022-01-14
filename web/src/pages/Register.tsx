import { Formik, Form } from "formik";
import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { InputField } from "../components/inputs/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { setAccessToken } from "../utils/accessToken";
import { bottomErrorHandler, fieldErrorHandler } from "../utils/errorHandler";

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = ({}) => {
  const [_, register] = useRegisterMutation();
  const navigate = useNavigate();
  const [bottomError, setBottomError] = useState<Array<String>>([""]);

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <h2 className="mt-8 text-center text-3xl font-bold">
            Sign up your account
          </h2>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={async (
              { username, email, password, confirmPassword },
              { setErrors }
            ) => {
              setBottomError([""]);
              const response = await register({
                registerInput: {
                  username,
                  email,
                  password,
                  confirmPassword,
                },
              });
              if (response.error) {
                const errorArray: string[] = bottomErrorHandler(
                  response.error.message
                );
                setBottomError(errorArray);
              }
              if (response.data?.register.fieldError) {
                const errorMap = fieldErrorHandler(
                  response.data.register.fieldError
                );
                setErrors(errorMap);
              }
              if (response.data?.register.accessToken) {
                setAccessToken(response.data.register.accessToken);
                navigate("/");
              }
              // todos: store access token in local storage
              // todos: redirect
            }}
          >
            <Form className="space-y-4">
              <InputField
                name="username"
                label="Username"
                placeholder="username"
                type="text"
              />
              <InputField
                name="email"
                label="Email"
                placeholder="email"
                type="text"
              />
              <InputField
                name="password"
                label="Password"
                placeholder="password"
                type="password"
              />
              <InputField
                name="confirmPassword"
                label="Confirm password"
                placeholder="confirm password"
                type="password"
              />
              <div className="text-sm">
                <a
                  href="/sign-in"
                  className="font-medium text-gray-600 hover:text-gray-900"
                >
                  Have an account?
                </a>
              </div>
              <ul className="px-4 list-disc">
                {bottomError[0]
                  ? bottomError.map((e, index) => {
                      return (
                        <li key={index} className=" text-red-500 font-medium">
                          {e}
                        </li>
                      );
                    })
                  : ""}
              </ul>
              <div className="flex flew-row space-x-4">
                <button
                  type="button"
                  className="inline-flex items-center w-full justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:cursor-pointer"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <FaAngleLeft size={18} />
                  Back
                </button>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Sign up
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};
