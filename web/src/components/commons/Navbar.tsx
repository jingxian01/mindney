import { Disclosure } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import { FaMoneyCheck } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hook";
import { SignOutModal } from "./modals/SignOutModal";

interface NavbarProps {}

interface NavbarTabs {
  displayName: string;
  to: string;
}

const navbarTabs: NavbarTabs[] = [
  {
    displayName: "Table",
    to: "/table",
  },
  {
    displayName: "Graph",
    to: "/graph",
  },
];

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [signOutIsOpen, setSignOutIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const userData = useAppSelector((state) => state.user);
  const [currentPath, setCurrentPath] = useState<String>("");
  const location = useLocation();

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-900">
        {({ open }) => (
          <>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex space-x-4">
                  <div className="inline-flex items-center space-x-2 text-white text-xl font-bold">
                    <FaMoneyCheck />
                    <span>Mindney</span>
                  </div>
                  <div className="hidden md:block">
                    {userData && userData.user ? (
                      <div className="ml-10 flex items-baseline space-x-10">
                        {navbarTabs.map((tab) => {
                          return (
                            <button
                              key={tab.displayName}
                              className={`${
                                currentPath == tab.to
                                  ? "bg-gray-700"
                                  : "hover:bg-gray-700"
                              } text-white  px-6 py-2 rounded-md text-md font-bold`}
                              onClick={() => navigate(tab.to)}
                            >
                              {tab.displayName}
                            </button>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                </div>
                <Disclosure.Button className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-white  hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  {open ? (
                    <BiX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <BiMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
                <div className="hidden md:block">
                  {userData && userData.user ? (
                    <div className="ml-10 flex items-baseline space-x-10">
                      <button className="hover:bg-red-600 text-white bg-red-500 px-6 py-2 rounded-md text-sm font-bold focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-700">
                        {userData.user.username}
                      </button>
                      <SignOutModal
                        signOutIsOpen={signOutIsOpen}
                        setSignOutIsOpen={setSignOutIsOpen}
                      />
                      <button
                        className="hover:bg-red-600 text-white bg-red-500 px-6 py-2 rounded-md text-sm font-bold focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-700"
                        onClick={() => setSignOutIsOpen(true)}
                      >
                        Sign out
                      </button>
                    </div>
                  ) : (
                    <div className="ml-10 flex items-baseline space-x-10">
                      <button
                        className="hover:bg-red-600 text-white bg-red-500 px-6 py-2 rounded-md text-sm font-bold focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-700"
                        onClick={() => {
                          navigate("/sign-up");
                        }}
                      >
                        Sign up
                      </button>
                      <button
                        className="hover:bg-red-600 text-white bg-red-500 px-6 py-2 rounded-md text-sm font-bold focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-700"
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
                  <div className="flex space-x-3">
                    <button className="w-full hover:bg-red-600 text-white bg-red-500 px-6 py-2 rounded-md text-sm font-bold focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-700">
                      {userData.user.username}
                    </button>
                    <button
                      className="w-full hover:bg-red-600 text-white bg-red-500 px-6 py-2 rounded-md text-sm font-bold focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-700"
                      onClick={() => setSignOutIsOpen(true)}
                    >
                      Sign out
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      className="w-full hover:bg-red-600 text-white bg-red-500 px-6 py-2 rounded-md text-sm font-bold focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-700"
                      onClick={() => {
                        navigate("/sign-up");
                      }}
                    >
                      Sign up
                    </button>
                    <button
                      className="w-full hover:bg-red-600 text-white bg-red-500 px-6 py-2 rounded-md text-sm font-bold focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-700"
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
