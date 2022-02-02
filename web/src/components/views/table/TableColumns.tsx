import React from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { By, Order } from "../../../generated/graphql";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import {
  SET_CURRENT_BY,
  SET_CURRENT_ORDER,
} from "../../../store/orderByRangeReducer";

interface TableColumnsProps {}

interface TableColumnNames {
  id: number;
  name: string;
  isClickable: boolean;
  by?: By;
}

const tableColNames: TableColumnNames[] = [
  {
    id: 1,
    name: "Name",
    isClickable: false,
  },
  {
    id: 2,
    name: "Category",
    isClickable: false,
  },
  {
    id: 3,
    name: "Amount",
    isClickable: true,
    by: By.Amount,
  },
  {
    id: 4,
    name: "Date",
    isClickable: true,
    by: By.Date,
  },
];

export const TableColumns: React.FC<TableColumnsProps> = ({}) => {
  const orderByRangeData = useAppSelector((state) => state.orderByRange);
  const dispatch = useAppDispatch();

  return (
    <thead className="bg-gray-50">
      <tr>
        {tableColNames.map((col) => (
          <th
            key={col.id}
            scope="col"
            className={`px-6 py-3 text-left text-xs uppercase tracking-wider ${
              orderByRangeData.by === col.by
                ? "font-bold text-gray-900"
                : "font-medium text-gray-500"
            }`}
            onClick={() => {
              // todos: think of another more efficient way to do this
              if (col.isClickable && col.by) {
                if (col.by === orderByRangeData.by) {
                  dispatch({
                    type: SET_CURRENT_ORDER,
                    payload: {
                      ...orderByRangeData,
                      order:
                        orderByRangeData.order === Order.Desc
                          ? Order.Asc
                          : Order.Desc,
                    },
                  });
                } else {
                  dispatch({
                    type: SET_CURRENT_BY,
                    payload: { ...orderByRangeData, by: col.by },
                  });
                }
              }
            }}
          >
            <div className="inline-flex items-center space-x-1">
              <span
                className={`
            ${col.isClickable ? "hover:cursor-pointer hover:text-gray-900" : ""}
            `}
              >
                {col.name}
              </span>
              {col.isClickable && orderByRangeData.by === col.by ? (
                orderByRangeData.order === Order.Desc ? (
                  <AiFillCaretDown color="red" />
                ) : (
                  <AiFillCaretUp color="green" />
                )
              ) : null}
            </div>
          </th>
        ))}
        <th scope="col" className="relative px-6 py-3">
          <span className="sr-only">Edit</span>
        </th>
      </tr>
    </thead>
  );
};
