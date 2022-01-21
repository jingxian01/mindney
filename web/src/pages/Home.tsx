import React, { useEffect, useState } from "react";
import { Layout } from "../components/commons/Layout";
import { useHelloQuery } from "../generated/graphql";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  const [{ data, fetching, error }, hello] = useHelloQuery({
    pause: true,
    requestPolicy: "network-only",
  });
  const [render, setRender] = useState<string>("");

  useEffect(() => {
    if (fetching) {
      setRender("loading...");
    }

    if (error) {
      setRender(error.message);
    }

    if (data) {
      setRender(data.hello);
    }
  }, [data, fetching, error]);

  return (
    <Layout>
      <div>homepage</div>
      <button
        className="p-2 rounded-md shadow-md border-gray-800"
        onClick={hello}
      >
        hello query
      </button>
      <div>{render}</div>
    </Layout>
  );
};
