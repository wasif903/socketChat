import React, { useState } from "react";
import styles from "./login.module.css";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../Redux/Reducers/AuthSlice";

function Login() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userData;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const [login] = useLoginMutation();

  const onLogIn = async () => {
    try {
      const res = await login(userData);
      if (!res.error) {
        console.log(res.data);
        alert(res.data.message);
        localStorage.setItem("userdata", JSON.stringify(res.data.user));
        navigate("/");
      } else {
        alert(res.error.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <h2 className="text-dark">Login</h2>
      <div className={styles.form}>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              className="my-2"
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              placeholder="name@example.com"
            />
            <Form.Control
              className="my-2"
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              placeholder="name@example.com"
            />
          </Form.Group>
        </Form>
        <span
          role="button"
          className="text-end"
          onClick={() => navigate("/signup")}
        >
          <p>SIGN UP</p>
        </span>
        <div className="text-center">
          <button className="btn btn-primary" onClick={onLogIn}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
