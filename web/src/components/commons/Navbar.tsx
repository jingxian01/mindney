import { Disclosure } from "@headlessui/react";
import { FaMoneyCheck } from "react-icons/fa";
import { BiLogIn, BiUserPlus } from "react-icons/bi";
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
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="inline-flex items-center space-x-2 text-white text-xl font-bold">
                      <FaMoneyCheck />
                      <span>mindney</span>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-6">
                        <button
                          className="bg-gray-900 text-white hover:bg-gray-700 px-4 py-2 rounded-md text-sm font-bold inline-flex items-center space-x-2"
                          onClick={() => {
                            navigate("sign-up");
                          }}
                        >
                          <BiUserPlus />
                          <span>sign up</span>
                        </button>
                        <button
                          className="bg-gray-900 text-white hover:bg-gray-700 px-4 py-2 rounded-md text-sm font-bold inline-flex items-center space-x-2"
                          onClick={() => {
                            navigate("sign-in");
                          }}
                        >
                          <BiLogIn />
                          <span>sign in</span>
                        </button>
                      </div>
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
