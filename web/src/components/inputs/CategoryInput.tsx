import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { CgSelect } from "react-icons/cg";
import { Category, useGetAllCategoriesQuery } from "../../generated/graphql";

interface CategoryInputProps {
  selectedCategory: Category;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category>>;
}

export const CategoryInput: React.FC<CategoryInputProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const [{ data }] = useGetAllCategoriesQuery();

  return data && data.getAllCategories && selectedCategory ? (
    <Listbox
      value={selectedCategory}
      onChange={(selected) => {
        setSelectedCategory(selected);
      }}
    >
      {({ open }) => (
        <>
          <Listbox.Label className="block font-medium text-sm sm:text-md">
            Category
          </Listbox.Label>
          <div className="relative">
            <Listbox.Button className="relative w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-left focus:outline-none focus:ring-2 focus:border-white focus:ring-gray-700 text-sm">
              <span className="block truncate">{selectedCategory.name}</span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <CgSelect size={20} />
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-2 w-full bg-white shadow-lg max-h-40 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {data?.getAllCategories.map((category) => (
                  <Listbox.Option
                    key={category.id}
                    className={({ active }) =>
                      `${
                        active ? "text-white bg-red-500" : "text-gray-900"
                      } cursor-default select-none relative py-2 pl-3 pr-9`
                    }
                    value={category}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`${
                            selected ? "font-semibold" : "font-normal"
                          } ml-3 block truncate text-sm sm:text-md`}
                        >
                          {category.name}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  ) : null;
};
