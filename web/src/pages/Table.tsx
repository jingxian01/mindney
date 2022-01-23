import { Tab } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/commons/Layout";
import { ViewLayout } from "../components/views/ViewLayout";
import { useAppSelector } from "../store/hook";

interface TableProps {}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const timeTabs = ["Day", "Week", "Month"];
const orderTabs = ["Date", "Amount"];
const tabContents = [
  [
    {
      id: 1,
      content: "day day day 1",
    },
    {
      id: 2,
      content: "day day day 2",
    },
    {
      id: 3,
      content: "day day day 3",
    },
  ],
  [
    {
      id: 4,
      content: "week week week 4",
    },
    {
      id: 5,
      content: "week week week 5",
    },
    {
      id: 6,
      content: "week week week 6",
    },
  ],
  [
    {
      id: 7,
      content: "month month month 7",
    },
    {
      id: 8,
      content: "month month month 8",
    },
    {
      id: 9,
      content: "month month month 9",
    },
  ],
];

export const Table: React.FC<TableProps> = ({}) => {
  const userData = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [currentTimeTab, SetCurrentTimeTab] = useState<String>("Day");
  const [currentOrderTab, SetCurrentOrderTab] = useState<String>("Date");

  useEffect(() => {
    if (!userData || !userData.user) {
      navigate("/");
    }
  }, [userData]);

  return (
    <Layout>
      <ViewLayout>
        <div className="space-y-4">
          <div className="w-5/6 mx-auto py-4 rounded-lg bg-white shadow-lg">
            <div className="w-1/2 mx-auto space-y-3">
              <div className="flex p-1 space-x-1 bg-white rounded-xl shadow-md">
                {timeTabs.map((tab) => (
                  <button
                    key={tab}
                    className={`w-full py-2 leading-5 text-sm rounded-lg focus:outline-none
                    ${
                      currentTimeTab == tab
                        ? "text-white bg-gradient-to-r from-teal-500 to-teal-600 font-bold"
                        : "hover:bg-teal-50 font-medium"
                    }
                  `}
                    onClick={() => {
                      SetCurrentTimeTab(tab);
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex p-1 space-x-1 bg-white rounded-xl shadow-md">
                {orderTabs.map((tab) => (
                  <button
                    key={tab}
                    className={`w-full py-2 leading-5 text-sm rounded-lg focus:outline-none
                  ${
                    currentOrderTab == tab
                      ? "text-white bg-gradient-to-r from-teal-500 to-teal-600 font-bold"
                      : "hover:bg-teal-50 font-medium"
                  }
                `}
                    onClick={() => {
                      SetCurrentOrderTab(tab);
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="w-5/6 mx-auto py-4 rounded-lg bg-white shadow-lg">
            test
          </div>
        </div>
      </ViewLayout>
    </Layout>
  );
};
