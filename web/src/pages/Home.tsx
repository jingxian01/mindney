import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/commons/Layout";
import { useAppSelector } from "../store/hook";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
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
