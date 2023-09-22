import { useState } from "react";
import "./App.css";
import { useRoutes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import LoggedOut from "./Router/Logout";
import User from "./Router/User";

function App() {
  const NotAUser = useRoutes(LoggedOut);
  const user = useRoutes(User);

  const userData = JSON.parse(localStorage.getItem("userdata"));
  console.log(userData);
  
  let routes;

  if (userData) {
    routes = user;
  } else {
    routes = NotAUser;
  }

  return <>{routes}</>;
}

export default App;
