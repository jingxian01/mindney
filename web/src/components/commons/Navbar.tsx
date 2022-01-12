import { Disclosure } from "@headlessui/react";
import { FaMoneyCheck } from "react-icons/fa";
import React from "react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800 py-1">
          {({ open }) => (
            <>
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="inline-flex items-center space-x-2 text-white text-xl font-bold">
                    <FaMoneyCheck />
                    <span>Mindney</span>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-10">
                      <button
                        className="hover:bg-gray-900 text-white bg-gray-700 px-6 py-2 rounded-md text-sm font-bold"
                        onClick={() => {
                          navigate("sign-up");
                        }}
                      >
                        Sign up
                      </button>
                      <button
                        className="hover:bg-gray-900 text-white bg-gray-700 px-6 py-2 rounded-md text-sm font-bold "
                        onClick={() => {
                          navigate("sign-in");
                        }}
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
};
