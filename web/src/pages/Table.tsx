import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/commons/Layout";
import { TableColumns } from "../components/views/table/TableColumns";
import { TableContents } from "../components/views/table/TableContents";
import { ViewLayout } from "../components/views/ViewLayout";
import { useGetSpendsByDayQuery, User } from "../generated/graphql";
import { useAppSelector } from "../store/hook";

interface TableProps {}

const timeTabs = ["Day", "Week", "Month"];
const orderTabs = ["Date", "Amount"];

export const Table: React.FC<TableProps> = ({}) => {
  const userData = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [currentTimeTab, SetCurrentTimeTab] = useState<string>("Day");
  const [currentOrderTab, SetCurrentOrderTab] = useState<string>("Date");
  const [{ data, fetching }, getSpendsByDay] = useGetSpendsByDayQuery({
    variables: {
      orderBy: {
        by: `orderBy${currentOrderTab}`,
        order: "",
      },
    },
  });

  useEffect(() => {
    if (!userData || !userData.user) {
      navigate("/");
    }
  }, [userData]);

  return (
    <Layout>
      <ViewLayout>
        <div className="space-y-4">
          <div className="sm:w-1/2 mx-auto space-y-3">
            <div className="flex p-1 space-x-1 bg-white rounded-lg shadow-md">
              {timeTabs.map((tab) => (
                <button
                  key={tab}
                  className={`w-full py-2 leading-5 text-sm rounded-md focus:outline-none
                    ${
                      currentTimeTab == tab
                        ? "text-white bg-gradient-to-r from-teal-500 to-teal-600 font-bold"
                        : "hover:bg-teal-100 font-medium"
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
          </div>
          <div className="mx-auto rounded-lg bg-white shadow-lg overflow-x-auto">
            <div className="align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <TableColumns
                    currentOrder={currentOrderTab}
                    setCurrentOrder={SetCurrentOrderTab}
                  />
                  <tbody className="bg-white divide-y divide-gray-200">
                    {fetching ? (
                      <tr>
                        <td className="px-2">loading...</td>
                      </tr>
                    ) : null}
                    {data && data.getSpendsByDay && userData.user
                      ? data.getSpendsByDay.map((spend) => (
                          <tr key={spend.id}>
                            <TableContents
                              key={spend.id}
                              spend={{ ...spend, user: userData.user as User }}
                            />
                          </tr>
                        ))
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </ViewLayout>
    </Layout>
  );
};
