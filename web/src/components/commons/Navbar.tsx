import { Disclosure } from "@headlessui/react";
import React, { useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import { FaMoneyCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hook";
import { SignOutModal } from "../SignOutModal";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [signOutIsOpen, setSignOutIsOpen] = useState<boolean>(false);
  // const [authButtonGroup, setAtuhButtonGroup] = useState<JSX.Element>();
  const navigate = useNavigate();
  // const [{ data, fetching }] = useMeQuery({});
  const userData = useAppSelector((state) => state.user);

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-teal-700">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex space-x-4">
                  <div className="inline-flex items-center space-x-2 text-white text-xl font-bold">
                    <FaMoneyCheck />
                    <span>Mindney</span>
                  </div>
                  <div className="hidden md:block">
                    {userData && userData.user ? (
                      <div className="ml-10 flex items-baseline space-x-10">
                        <button
                          className="hover:bg-teal-800 text-white bg-teal-700 px-6 py-2 rounded-md text-md font-bold"
                          onClick={() => navigate("/table")}
                        >
                          Table
                        </button>
                        <button
                          className="hover:bg-teal-800 text-white bg-teal-700 px-6 py-2 rounded-md text-md font-bold"
                          onClick={() => navigate("/graph")}
                        >
                          Graph
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
                <Disclosure.Button className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-white  hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  {open ? (
                    <BiX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <BiMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
                <div className="hidden md:block">
                  {userData && userData.user ? (
                    <div className="ml-10 flex items-baseline space-x-10">
                      <button className="hover:bg-teal-900 text-white bg-teal-800 px-6 py-2 rounded-md text-sm font-bold">
                        {userData.user.username}
                      </button>
                      <SignOutModal
                        signOutIsOpen={signOutIsOpen}
                        setSignOutIsOpen={setSignOutIsOpen}
                      />
                      <button
                        className="hover:bg-teal-900 text-white bg-teal-800 px-6 py-2 rounded-md text-sm font-bold"
                        onClick={() => setSignOutIsOpen(true)}
                      >
                        Sign out
                      </button>
                    </div>
                  ) : (
                    <div className="ml-10 flex items-baseline space-x-10">
                      <button
                        className="hover:bg-teal-900 text-white bg-teal-800 px-6 py-2 rounded-md text-sm font-bold"
                        onClick={() => {
                          navigate("/sign-up");
                        }}
                      >
                        Sign up
                      </button>
                      <button
                        className="hover:bg-teal-900 text-white bg-teal-800 px-6 py-2 rounded-md text-sm font-bold"
                        onClick={() => {
                          navigate("/sign-in");
                        }}
                      >
                        Sign in
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-2 px-3 pt-2 pb-3">
                {userData && userData.user ? (
                  <>
                    <button className="w-full hover:bg-teal-900 text-white bg-teal-800 px-6 py-2 rounded-md text-sm font-bold">
                      {userData.user.username}
                    </button>
                    <button
                      className="w-full hover:bg-teal-900 text-white bg-teal-800 px-6 py-2 rounded-md text-sm font-bold"
                      onClick={() => setSignOutIsOpen(true)}
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="w-full hover:bg-teal-900 text-white bg-teal-800 px-6 py-2 rounded-md text-sm font-bold"
                      onClick={() => {
                        navigate("/sign-up");
                      }}
                    >
                      Sign up
                    </button>
                    <button
                      className="w-full hover:bg-teal-900 text-white bg-teal-800 px-6 py-2 rounded-md text-sm font-bold"
                      onClick={() => {
                        navigate("/sign-in");
                      }}
                    >
                      Sign in
                    </button>
                  </>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};
