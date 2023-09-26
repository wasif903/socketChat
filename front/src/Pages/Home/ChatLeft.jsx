import React, { useState } from "react";
import { useGetUsersQuery } from "../../Redux/Reducers/AuthSlice";
import ChatMid from "./ChatMid";

function ChatLeft({ allUsers, selectedUser, setSelectedUser }) {
  const userData = JSON.parse(localStorage.getItem("userdata"));

  return (
    <>
      <h2 className="pt-5 text-center">ALL USERS</h2>
      <hr /> 
      {allUsers?.users
        .filter((item) => item?._id !== userData?._id)
        .map((user) => (
          <div
            key={user._id}
            className="bg-primary text-white p-3 my-3 rounded"
            role="button"
            onClick={() => setSelectedUser(user)}
          >
            <h5>{user?.username}</h5>
          </div>
        ))}
    </>
  );
}

export default ChatLeft;
