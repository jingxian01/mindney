import React from "react";

interface ViewLayoutProps {}

export const ViewLayout: React.FC<ViewLayoutProps> = ({ children }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 sm:mt-4">
      {children}
    </div>
  );
};
