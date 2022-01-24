import React from "react";

interface TableColumnsProps {
  currentOrderBy: string;
  setCurrentOrderBy: React.Dispatch<React.SetStateAction<string>>;
  amountIsDesc: boolean;
  setAmountIsDesc: React.Dispatch<React.SetStateAction<boolean>>;
  dateIsDesc: boolean;
  setDateIsDesc: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TableColumnNames {
  id: number;
  name: string;
  isClickable: boolean;
  currentOrder?: string;
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
  },
  {
    id: 4,
    name: "Date",
    isClickable: true,
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
              currentOrderBy === col.name
                ? "text-gray-900 font-bold"
                : "text-gray-500 font-medium"
            }`}
            onClick={() => {
              // todos: think of another more efficient way to do this
              if (col.isClickable) {
                if (col.name === currentOrderBy) {
                  if (col.name === "Amount") {
                    setAmountIsDesc(!amountIsDesc);
                  } else {
                    setDateIsDesc(!dateIsDesc);
                  }
                } else {
                  setCurrentOrderBy(col.name);
                }
              }
            }}
          >
            <span
              className={`
            ${col.isClickable ? "hover:cursor-pointer hover:text-gray-900" : ""}
            `}
            >
              {col.name}
            </span>
          </th>
        ))}
        <th scope="col" className="relative px-6 py-3">
          <span className="sr-only">Edit</span>
        </th>
      </tr>
    </thead>
  );
};
