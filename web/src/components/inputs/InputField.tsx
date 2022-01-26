import { useField } from "formik";
import React from "react";

interface InputFieldProps {
  name: string;
  label: string;
  placeholder: string;
  type: string;
}

export const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, { error }] = useField(props);
  return (
    <div>
      <label htmlFor={field.name} className="text-sm sm:text-md font-medium">
        {props.label}
      </label>
      <input
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
        className="mt-1 px-3 py-2 focus:border-teal-600 focus:ring-teal-700 w-full shadow-sm text-sm sm:text-md border-gray-300 rounded-md"
      />
      {error ? (
        <div className="px-1 text-red-500 font-medium text-sm sm:text-md">
          {error}
        </div>
      ) : null}
    </div>
  );
};
