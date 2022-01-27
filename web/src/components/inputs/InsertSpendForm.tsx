import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Category, useCreateSpendMutation } from "../../generated/graphql";
import { bottomErrorHandler } from "../../utils/validation";
import { CategoryInput } from "./CategoryInput";
import { InputField } from "./InputField";

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
  const [selectedCategory, setSelectedCategory] =
    useState<Category>(initialCategory);
  const [_, createSpend] = useCreateSpendMutation();
  const [bottomError, setBottomError] = useState<Array<String>>([""]);

  return (
    <div className="w-full py-2 md:py-4 lg:py-6">
      <Formik
        initialValues={{
          name: "",
          description: "",
          amount: "",
        }}
        onSubmit={async ({ name, description, amount }, { setErrors }) => {
          setBottomError([""]); // reset error
          if (!amount) {
            setErrors({
              amount: "amount should not be empty",
            });
          }
          const amountInNumber = Number(amount);
          if (!amountInNumber) {
            setErrors({
              amount: "amount should be a number",
            });
          } else {
            const response = await createSpend({
              spendInput: {
                name,
                description,
                amount: amountInNumber,
                categoryId: selectedCategory.id,
              },
            });
            if (response.error) {
              // eg: [GraphQL Error] message, ..., message
              const errorArray: string[] = bottomErrorHandler(
                response.error.message
              );
              setBottomError(errorArray);
            }
            if (response.data?.createSpend) {
              setInsertSpendIsOpen(false);
            }
          }
        }}
      >
        <Form>
          <div className="space-y-4">
            <InputField
              name="name"
              label="Name"
              placeholder="name"
              type="text"
            />
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
          </div>
          <ul className="px-6 mt-10 list-disc">
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
          <div className="px-0 mt-28 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-700 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => {}}
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
        </Form>
      </Formik>
    </div>
  );
};
