import { useField } from "formik";
import React from "react";

interface InputFieldProps {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
}

export const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, { error }] = useField(props);
  return (
    <div>
      <label htmlFor={field.name} className="font-medium">
        {props.label}
      </label>
      <input
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
        className="mt-1 px-3 py-2 focus:border-gray-500 focus:ring-gray-400 w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      />
      {error ? (
        <div className="p-1 text-red-600 font-medium">{error}</div>
      ) : null}
    </div>
  );
};
