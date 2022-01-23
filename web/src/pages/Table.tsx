import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/commons/Layout";
import { ViewLayout } from "../components/views/ViewLayout";
import { useAppSelector } from "../store/hook";

interface TableProps {}

export const Table: React.FC<TableProps> = ({}) => {
  const userData = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData || !userData.user) {
      navigate("/");
    }
  }, [userData]);

  return (
    <Layout>
      <ViewLayout>
        <div>table view</div>
      </ViewLayout>
    </Layout>
  );
};
