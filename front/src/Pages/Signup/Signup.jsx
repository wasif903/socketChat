import React, { useState } from "react";
import styles from "./signup.module.css";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../Redux/Reducers/AuthSlice";

function Signup() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const { username, email, password } = userData;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const [signup] = useSignupMutation();

  const onSignUp = async () => {
    try {
      const res = await signup(userData);
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
      <h2 className="text-dark">Signup</h2>
      <div className={styles.form}>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              className="my-2"
              type="text"
              name="username"
              value={username}
              onChange={handleInputChange}
              placeholder="ex. John Doe"
            />
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
              placeholder="Password"
            />
          </Form.Group>
        </Form>
        <span
          role="button"
          className="text-end"
          onClick={() => navigate("/login")}
        >
          <p>Login</p>
        </span>
        <div className="text-center">
          <button className="btn btn-primary" onClick={onSignUp}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
