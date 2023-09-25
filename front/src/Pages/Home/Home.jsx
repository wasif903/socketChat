import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChatLeft from "./ChatLeft";
import { Col, Container, Row } from "react-bootstrap";
import ChatMid from "./ChatMid";
import { useGetUsersQuery } from "../../Redux/Reducers/AuthSlice";

const ENDPOINT = "http://localhost:5000"; // Use the correct endpoint

function Home() {
  const userData = JSON.parse(localStorage.getItem("userdata"));
  console.log(userData._id);

  const [isSocketConnected, setIsSocketConnected] = useState(false);

  useEffect(() => {
    const socket = io(ENDPOINT);

    console.log("Socket Connected");
    socket.emit("setup", userData);

    socket.on("connected", () => {
      setIsSocketConnected(true);
    });

    return () => {
      socket.disconnect();
    };
  }, [userData]);

  const getUsers = useGetUsersQuery();
  console.log(isSocketConnected);

  const [selectedUser, setSelectedUser] = useState({});

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="2">
            <ChatLeft
              allUsers={getUsers?.data}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          </Col>
          <Col md="8">
            <ChatMid selectedUser={selectedUser} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
