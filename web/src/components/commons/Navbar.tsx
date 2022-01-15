import { Disclosure } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { FaMoneyCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useMeQuery } from "../../generated/graphql";
import { SignOutModal } from "../SignOutModal";
import { BiMenu, BiX } from "react-icons/bi";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [signOutIsOpen, setSignOutIsOpen] = useState<boolean>(false);
  // const [authButtonGroup, setAtuhButtonGroup] = useState<JSX.Element>();
  const navigate = useNavigate();
  const [{ data, fetching }] = useMeQuery({});

  return (
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
                <Disclosure.Button className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  {open ? (
                    <BiX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <BiMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
                <div className="hidden md:block">
                  {fetching || (data && data.me) ? (
                    <div>
                      <div className="ml-10 flex items-baseline space-x-10">
                        <button className="hover:bg-gray-900 text-white bg-gray-700 px-6 py-2 rounded-md text-sm font-bold">
                          {data && data.me ? data.me.username : "loading..."}
                        </button>
                        <SignOutModal
                          signOutIsOpen={signOutIsOpen}
                          setSignOutIsOpen={setSignOutIsOpen}
                        />
                        <button
                          className="hover:bg-gray-900 text-white bg-gray-700 px-6 py-2 rounded-md text-sm font-bold"
                          onClick={() => setSignOutIsOpen(true)}
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
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
                  )}
                </div>
              </div>
            </div>
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-2 px-3 pt-2 pb-3">
                {fetching || (data && data.me) ? (
                  <>
                    <button className="w-full hover:bg-gray-900 text-white bg-gray-700 px-6 py-2 rounded-md text-sm font-bold">
                      {data && data.me ? data.me.username : "loading..."}
                    </button>
                    <button
                      className="w-full hover:bg-gray-900 text-white bg-gray-700 px-6 py-2 rounded-md text-sm font-bold"
                      onClick={() => setSignOutIsOpen(true)}
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="w-full hover:bg-gray-900 text-white bg-gray-700 px-6 py-2 rounded-md text-sm font-bold"
                      onClick={() => {
                        navigate("sign-up");
                      }}
                    >
                      Sign up
                    </button>
                    <button
                      className="w-full hover:bg-gray-900 text-white bg-gray-700 px-6 py-2 rounded-md text-sm font-bold "
                      onClick={() => {
                        navigate("sign-in");
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
