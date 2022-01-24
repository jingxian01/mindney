import React from "react";

interface TableColumnsProps {}

const tableColNames = ["Name", "Amount", "Category", "Date"];

export const TableColumns: React.FC<TableColumnsProps> = ({}) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        {tableColNames.map((col, idx) => (
          <th
            key={idx}
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {col}
          </th>
        ))}
        <th scope="col" className="relative px-6 py-3">
          <span className="sr-only">Edit</span>
        </th>
      </tr>
    </thead>
  );
};
