import React from "react";
import { Spend } from "../../../generated/graphql";
import { getDateFromUnix } from "../../../utils/date";

interface TableContentsProps {
  spend: Spend;
}

export const TableContents: React.FC<TableContentsProps> = ({ spend }) => {
  return (
    <>
      <td className="px-2">
        <div className="ml-4 text-sm font-medium">{spend.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 italic">$ {spend.amount}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {spend.category.name}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {getDateFromUnix(spend.date)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        {/* todos: add edit dialog here */}
        <a href="#" className="text-indigo-600 hover:text-indigo-900">
          Edit
        </a>
      </td>
    </>
  );
};
