import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChatLeft from "./ChatLeft";
import { Col, Container, Row } from "react-bootstrap";
import ChatMid from "./ChatMid";
import { useGetUsersQuery } from "../../Redux/Reducers/AuthSlice";
import axios from "axios";
import BASE_URL from "../../Config";
const ENDPOINT = "http://localhost:5000"; // Use the correct endpoint

function Home() {
  const userData = JSON.parse(localStorage.getItem("userdata"));

  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [messageData, setMessageData] = useState("");
  const [selectedUser, setSelectedUser] = useState({});

  const fetchMessages = async () => {
    if (!selectedUser) return;

    const { data } = await axios.get(
      `${BASE_URL}/api/${userData?._id}/get-chats/${selectedUser?._id}`
    );
    setMessageData(data);
  };

  useEffect(() => {
    const socket = io(ENDPOINT);
    socket.emit("setup", userData);
    socket.on("connected", () => {
      setIsSocketConnected(true);
    });

    fetchMessages();
    return () => {
      socket.disconnect();
    };
  }, [userData, selectedUser]);

  const getUsers = useGetUsersQuery();

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
            <ChatMid
              selectedUser={selectedUser}
              fetchMessages={fetchMessages}
              messageData={messageData}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
