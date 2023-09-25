import React, { useState } from "react";
import { Form } from "react-bootstrap";

function ChatMid({ selectedUser }) {
  console.log(selectedUser);

  const [message, setMessage] = useState("");

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
        <div className="d-flex">
          <div
            className="bg-success"
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          ></div>
          <p className="bg-success text-white ms-2 px-3 py-2 rounded">
            Helloo Text
          </p>
        </div>

        <div className="d-flex justify-content-end">
          <p className="bg-primary text-white me-2 px-3 py-2 rounded">
            Helloo Text
          </p>
          <div
            className="bg-primary"
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          ></div>
        </div>
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
          <button className="btn btn-success">Send</button>
        </div>
      </div>
    </>
  );
}

export default ChatMid;
