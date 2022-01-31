import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/commons/Layout";
import { TableColumns } from "../components/views/table/TableColumns";
import { TableContents } from "../components/views/table/TableContents";
import { ViewLayout } from "../components/views/ViewLayout";
import {
  By,
  Order,
  useGetSpendsByRangeQuery,
  User,
} from "../generated/graphql";
import { useAppSelector } from "../store/hook";
import { DateRange, getCurrentDayRange, getRange } from "../utils/date";

interface TableProps {}

const timeTabs = ["Day", "Week", "Month"];

export const Table: React.FC<TableProps> = ({}) => {
  const userData = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [currentTimeTab, SetCurrentTimeTab] = useState<string>("Day");
  const [dateRange, setDateRange] = useState<DateRange>(getCurrentDayRange());
  const [currentOrderBy, setCurrentOrderBy] = useState<By>(By.Date);
  const [amountIsDesc, setAmountIsDesc] = useState<boolean>(true);
  const [dateIsDesc, setDateIsDesc] = useState<boolean>(true);

  const [{ data, fetching }] = useGetSpendsByRangeQuery({
    variables: {
      orderByRange: {
        ...dateRange,
        by: currentOrderBy,
        order:
          currentOrderBy === By.Amount
            ? amountIsDesc
              ? Order.Desc
              : Order.Asc
            : dateIsDesc
            ? Order.Desc
            : Order.Asc,
      },
      limit: 10,
      cursor: null,
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
        <div className="space-y-2 sm:space-y-4">
          <div className="mx-auto space-y-3 sm:w-1/2">
            <div className="flex space-x-1 rounded-lg bg-white p-1 shadow-md">
              {timeTabs.map((tab) => (
                <button
                  key={tab}
                  className={`w-full rounded-md py-2 text-sm leading-5 focus:outline-none
                    ${
                      currentTimeTab == tab
                        ? "bg-gradient-to-r from-red-900 to-gray-800 text-white"
                        : "font-medium hover:bg-gray-100"
                    }
                  `}
                  onClick={() => {
                    SetCurrentTimeTab(tab);
                    const { start, end } = getRange(tab);
                    setDateRange({ start, end });
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="mx-auto overflow-x-auto rounded-lg bg-white shadow-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <TableColumns
                    currentOrderBy={currentOrderBy}
                    setCurrentOrderBy={setCurrentOrderBy}
                    amountIsDesc={amountIsDesc}
                    setAmountIsDesc={setAmountIsDesc}
                    dateIsDesc={dateIsDesc}
                    setDateIsDesc={setDateIsDesc}
                  />
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {fetching ? (
                      <tr>
                        <td className="px-6 py-4">loading...</td>
                      </tr>
                    ) : null}
                    {data && data.getSpendsByRange && userData.user
                      ? data.getSpendsByRange.map((spend) => (
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
          <div className="mx-auto sm:w-1/6">
            {data && data.getSpendsByRange[0] ? (
              <button className="w-full rounded-md bg-white py-2 text-sm shadow-md hover:bg-gray-200">
                load more
              </button>
            ) : (
              <div className="text-center text-sm text-gray-500">
                -- no data --
              </div>
            )}
          </div>
        </div>
      </ViewLayout>
    </Layout>
  );
};
