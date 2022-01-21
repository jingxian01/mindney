import React from "react";
import { Layout } from "../components/commons/Layout";
import { Intro } from "../components/views/Intro";
import { View } from "../components/views/View";
import { useAppSelector } from "../store/hook";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  // const [{ data, fetching, error }, hello] = useHelloQuery({
  //   pause: true,
  //   requestPolicy: "network-only",
  // });
  const userData = useAppSelector((state) => state.user);

  return <Layout>{userData && userData.user ? <View /> : <Intro />}</Layout>;
};
