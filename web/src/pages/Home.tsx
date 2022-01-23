import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  useEffect(() => {
    if (userData && userData.user) {
      navigate("/table");
    }
  }, [userData]);

  return (
    <Layout>
      <Intro />
    </Layout>
  );
};
