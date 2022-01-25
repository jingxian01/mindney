import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/commons/Layout";
import { TableColumns } from "../components/views/table/TableColumns";
import { TableContents } from "../components/views/table/TableContents";
import { ViewLayout } from "../components/views/ViewLayout";
import { useGetSpendsByRangeQuery, User } from "../generated/graphql";
import { useAppSelector } from "../store/hook";
import { DateRange, getCurrentDayRange, getRange } from "../utils/date";

interface TableProps {}

const timeTabs = ["Day", "Week", "Month"];

export const Table: React.FC<TableProps> = ({}) => {
  const userData = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [currentTimeTab, SetCurrentTimeTab] = useState<string>("Day");
  const [dateRange, setDateRange] = useState<DateRange>(getCurrentDayRange());
  const [currentOrderBy, setCurrentOrderBy] = useState<string>("Date");
  const [amountIsDesc, setAmountIsDesc] = useState<boolean>(true);
  const [dateIsDesc, setDateIsDesc] = useState<boolean>(true);

  const [{ data, fetching }] = useGetSpendsByRangeQuery({
    variables: {
      orderByRange: {
        ...dateRange,
        by: `orderBy${currentOrderBy}`,
        order:
          currentOrderBy === "Amount"
            ? amountIsDesc
              ? "DESC"
              : "ASC"
            : dateIsDesc
            ? "DESC"
            : "ASC",
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
                    const { start, end } = getRange(tab);
                    setDateRange({ start, end });
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
                    currentOrderBy={currentOrderBy}
                    setCurrentOrderBy={setCurrentOrderBy}
                    amountIsDesc={amountIsDesc}
                    setAmountIsDesc={setAmountIsDesc}
                    dateIsDesc={dateIsDesc}
                    setDateIsDesc={setDateIsDesc}
                  />
                  <tbody className="bg-white divide-y divide-gray-200">
                    {fetching ? (
                      <tr>
                        <td className="px-2">loading...</td>
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
        </div>
      </ViewLayout>
    </Layout>
  );
};
