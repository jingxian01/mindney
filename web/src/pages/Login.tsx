import { Form, Formik } from "formik";
import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { InputField } from "../components/inputs/InputField";
import { useLoginMutation } from "../generated/graphql";
import { InputFieldType } from "../types/InputField.type";
import { setAccessToken } from "../utils/accessToken";
import { bottomErrorHandler, fieldErrorHandler } from "../utils/validation";

const inputField: InputFieldType[] = [
  {
    name: "usernameOrEmail",
    label: "Username or email",
    placeholder: "username or email",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "password",
    type: "password",
  },
];

export const Login: React.FC = ({}) => {
  const [_, login] = useLoginMutation();
  const navigate = useNavigate();
  const [bottomError, setBottomError] = useState<Array<String>>([""]);

  return (
    <div className="min-h-full flex items-center justify-center px-4 py-2 md:py-10 lg:py-12">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-8 text-center text-3xl font-bold">
          Sign in to your account
        </h2>
        <Formik
          initialValues={{ usernameOrEmail: "", password: "" }}
          onSubmit={async ({ usernameOrEmail, password }, { setErrors }) => {
            setBottomError([""]); // reset error
            const response = await login({
              loginInput: {
                usernameOrEmail,
                password,
              },
            });
            if (response.error) {
              // eg: [GraphQL Error] message, ..., message
              const errorArray: string[] = bottomErrorHandler(
                response.error.message
              );
              setBottomError(errorArray);
            }
            if (response.data?.login.fieldError) {
              const errorMap = fieldErrorHandler(
                response.data.login.fieldError
              );
              setErrors(errorMap);
            }
            if (response.data?.login.accessToken) {
              setAccessToken(response.data.login.accessToken);
              navigate("/table");
            }
          }}
        >
          <Form className="space-y-4">
            {inputField.map((input, index) => {
              return (
                <InputField
                  key={index}
                  name={input.name}
                  label={input.label}
                  placeholder={input.placeholder}
                  type={input.type}
                />
              );
            })}
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a
                  href="/sign-up"
                  className="font-medium text-gray-600 hover:text-gray-900 focus:outline-none focus:rounded-sm focus:ring-2 focus:ring-teal-700"
                >
                  Sign up
                </a>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-gray-600 hover:text-gray-900 focus:outline-none focus:rounded-sm focus:ring-2 focus:ring-teal-700"
                >
                  Forgot your password?
                </a>
              </div>
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
                className="inline-flex items-center w-full justify-center py-3 px-4 text-sm font-medium rounded-md text-white bg-teal-800 hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-700"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <FaAngleLeft size={18} />
                Back
              </button>
              <button
                type="submit"
                className="inline-flex items-center w-full justify-center py-3 px-4 text-sm font-medium rounded-md text-white bg-teal-800 hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-700"
              >
                Sign in
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
