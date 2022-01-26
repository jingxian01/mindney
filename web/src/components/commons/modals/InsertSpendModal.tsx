import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { InsertSpendForm } from "../../inputs/InsertSpendForm";

interface InsertSpendModalProps {
  insertSpendIsOpen: boolean;
  setInsertSpendIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InsertSpendModal: React.FC<InsertSpendModalProps> = ({
  insertSpendIsOpen,
  setInsertSpendIsOpen,
}) => {
  return (
    <Transition.Root show={insertSpendIsOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-1 inset-0 overflow-y-auto"
        onClose={setInsertSpendIsOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-bold text-gray-900"
                  >
                    Insert new spend
                  </Dialog.Title>
                  <InsertSpendForm
                    setInsertSpendIsOpen={setInsertSpendIsOpen}
                  />
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
