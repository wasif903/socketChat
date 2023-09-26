import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useChatMutation } from "../../Redux/chat/ChatSlice";

function ChatMid({ selectedUser, messageData, fetchMessages }) {
  const userData = JSON.parse(localStorage.getItem("userdata"));
  const [message, setMessage] = useState("");

  useEffect(() => {}, []);

  const [chat] = useChatMutation();

  const onMessage = async () => {
    try {
      if (message === "") {
        return alert("Message Empty");
      }
      const res = await chat({
        userID: userData._id,
        to: selectedUser._id,
        message: message,
      });

      if (!res.error) {
        setMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("selectedUser:", selectedUser);
  console.log("messageData:", messageData);
  console.log("userData:", userData);

  return (
    <>
      <div>
        <h1 className="text-center pt-5">
          {Object.keys(selectedUser).length !== 0
            ? selectedUser.username
            : "No User Selected"}{" "}
        </h1>
        <hr className="pt-0 mt-0" />
      </div>

      <div style={{ height: "70vh" }} className="bg-danger">
        {selectedUser &&
          messageData.map((item) =>
            item.userID === userData._id ? (
              <div key={item._id} className="d-flex justify-content-end">
                <p className="bg-primary text-white me-2 px-3 py-2 rounded">
                  {item?.message}
                </p>
                <div
                  className="bg-primary"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                  }}
                ></div>
              </div>
            ) : (
              <div key={item._id} className="d-flex">
                <div
                  className="bg-success"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                  }}
                ></div>
                <p className="bg-success text-white ms-2 px-3 py-2 rounded">
                  {item?.message}
                </p>
              </div>
            )
          )}
      </div>

      <div className="d-flex justify-content-center align-items-center my-3">
        <div>
          <Form className="d-flex me-2">
            <Form.Group controlId="exampleForm.ControlInput1">
              <textarea
                className="border-success form-control"
                name=""
                id=""
                cols="30"
                rows="1"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ resize: "none" }}
              ></textarea>
            </Form.Group>
          </Form>
        </div>
        <div>
          <button onClick={onMessage} className="btn btn-success">
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatMid;
