import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/commons/Layout";
import { ViewLayout } from "../components/views/ViewLayout";
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
      <div>intro page</div>
    </Layout>
  );
};
