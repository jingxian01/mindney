import React, { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { InsertSpendModal } from "../commons/modals/InsertSpendModal";

interface ViewLayoutProps {}

export const ViewLayout: React.FC<ViewLayoutProps> = ({ children }) => {
  const [insertSpendIsOpen, setInsertSpendIsOpen] = useState<boolean>(false);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 sm:mt-6">
      <div className="shadow-xl min-h-full bg-gray-100 rounded-lg p-2 sm:p-6">
        {children}
      </div>
      <InsertSpendModal
        signOutIsOpen={insertSpendIsOpen}
        setSignOutIsOpen={setInsertSpendIsOpen}
      />
      <button
        className="bottom-[5%] sm:bottom-[10%] absolute right-[10%] shadow-lg shadow-teal-600 hover:shadow-gray-500 p-4 rounded-full
        transition ease-in-out delay-150 hover:-translate-y-3 hover:scale-110 hover:bg-teal-600 text-teal-700 hover:text-white duration-300"
        onClick={() => setInsertSpendIsOpen(true)}
      >
        <BsPlusLg size={27} />
      </button>
    </div>
  );
};
