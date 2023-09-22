import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";

const LoggedOut = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <Login />,
  },
];

export default LoggedOut;
