import { Form, Formik, FormikProps } from "formik";
import React, { useRef, useState } from "react";
import { Category } from "../../generated/graphql";
import { CategoryInput } from "./CategoryInput";
import { InputField } from "./InputField";

type FormModel = {};
interface InsertSpendFormProps {
  setInsertSpendIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialCategory = {
  id: 1,
  name: "Housing",
};

export const InsertSpendForm: React.FC<InsertSpendFormProps> = ({
  setInsertSpendIsOpen,
}) => {
  // todos: set initial category
  const [selectedCategory, setSelectedCategory] =
    useState<Category>(initialCategory);
  const formRef = useRef<FormikProps<FormModel>>(null);

  return (
    <div className="w-full py-2 md:py-4 lg:py-6">
      <Formik
        innerRef={formRef}
        initialValues={{
          name: "",
          description: "",
          amount: "",
        }}
        onSubmit={(value) => {
          console.log(value);
          console.log(selectedCategory);
        }}
      >
        <Form className="space-y-4">
          <InputField name="name" label="Name" placeholder="name" type="text" />
          <InputField
            name="description"
            label="Description (optional)"
            placeholder="description"
            type="text"
          />
          <InputField
            name="amount"
            label="Amount"
            placeholder="$"
            type="text"
          />
          {/* todo: add calendar  */}
          <CategoryInput
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </Form>
      </Formik>
      <div className="px-0 mt-28 sm:flex sm:flex-row-reverse">
        <button
          type="submit"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-700 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => {
            if (formRef.current) {
              formRef.current.handleSubmit();
            }
          }}
        >
          Insert
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => setInsertSpendIsOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
