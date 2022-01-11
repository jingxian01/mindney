import React from "react";
import { Layout } from "../components/commons/Layout";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  return (
    <Layout>
      <div>homepage</div>
    </Layout>
  );
};
