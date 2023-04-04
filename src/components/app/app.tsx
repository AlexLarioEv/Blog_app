import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "../header/header";
import Main from "../main/main";
import useActions from "../../hooks/useActions";

import "antd/dist/reset.css";
import "./app.scss";

const App: React.FC = () => {
  const { fetchGetUser } = useActions();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchGetUser(token);
  }, []);

  return (
    <Router>
      <Header></Header>
      <Main></Main>
    </Router>
  );
};
export default App;
