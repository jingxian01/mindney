import React from "react";
import "./App.css";
import { useTestQueryQuery } from "./generated/graphql";

function App() {
  const [{ data, fetching, error }, execTQ] = useTestQueryQuery();

  return (
    <div className="container mx-auto mt-10">
      <h1>hello world</h1>
      <div>{data?.testQuery}</div>
    </div>
  );
}

export default App;
