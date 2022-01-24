import React from "react";

interface TableColumnsProps {
  currentOrder: string;
  setCurrentOrder: React.Dispatch<React.SetStateAction<string>>;
}

const tableColNames = [
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
  currentOrder,
  setCurrentOrder,
}) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        {tableColNames.map((col) => (
          <th
            key={col.id}
            scope="col"
            className={`px-6 py-3 text-left text-xs uppercase tracking-wider ${
              currentOrder === col.name
                ? "text-gray-900 font-bold"
                : "text-gray-500 font-medium"
            }`}
            onClick={() => {
              if (col.isClickable) {
                setCurrentOrder(col.name);
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
