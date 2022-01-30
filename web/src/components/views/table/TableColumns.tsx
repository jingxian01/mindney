import React from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { By } from "../../../generated/graphql";

interface TableColumnsProps {
  currentOrderBy: By;
  setCurrentOrderBy: React.Dispatch<React.SetStateAction<By>>;
  amountIsDesc: boolean;
  setAmountIsDesc: React.Dispatch<React.SetStateAction<boolean>>;
  dateIsDesc: boolean;
  setDateIsDesc: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TableColumnNames {
  id: number;
  name: string;
  isClickable: boolean;
  enumType?: By;
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
    enumType: By.Amount,
  },
  {
    id: 4,
    name: "Date",
    isClickable: true,
    enumType: By.Date,
  },
];

export const TableColumns: React.FC<TableColumnsProps> = ({
  currentOrderBy,
  setCurrentOrderBy,
  amountIsDesc,
  setAmountIsDesc,
  dateIsDesc,
  setDateIsDesc,
}) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        {tableColNames.map((col) => (
          <th
            key={col.id}
            scope="col"
            className={`px-6 py-3 text-left text-xs uppercase tracking-wider ${
              currentOrderBy === col.enumType
                ? "text-gray-900 font-bold"
                : "text-gray-500 font-medium"
            }`}
            onClick={() => {
              // todos: think of another more efficient way to do this
              if (col.isClickable && col.enumType) {
                if (col.enumType === currentOrderBy) {
                  if (col.enumType === By.Amount) {
                    setAmountIsDesc(!amountIsDesc);
                  } else {
                    setDateIsDesc(!dateIsDesc);
                  }
                } else {
                  setCurrentOrderBy(col.enumType);
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
              {col.isClickable && currentOrderBy === col.enumType ? (
                col.name === "Amount" ? (
                  amountIsDesc ? (
                    <AiFillCaretDown color="red" />
                  ) : (
                    <AiFillCaretUp color="green" />
                  )
                ) : dateIsDesc ? (
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
