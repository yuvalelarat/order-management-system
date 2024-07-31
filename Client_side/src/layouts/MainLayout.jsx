import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";

import { categories } from "../config";
const MainLayout = () => {
  const location = useLocation();

  const isMainPage = location.pathname === "/";

  return (
    <>
      <Header filter={isMainPage} filters={isMainPage ? categories : []} />
      <Outlet />
    </>
  );
};

export default MainLayout;
