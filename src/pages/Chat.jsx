import React, { useState, useEffect, useContext, useRef } from "react";
import styled from "styled-components";
import loader from "../assets/loader.gif";
import { io } from "socket.io-client";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { UserContext } from "../Context/UserContext.js";
import { host } from "../utils/ApiRoutes";

export default function Chat() {
  const socket = useRef();
  const { currentUser, savedUserData, contacts } = useContext(UserContext);

  const [currentChat, setCurrentChat] = useState(undefined);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      savedUserData();
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  return (
    <>
      {currentUser !== undefined ? (
        <Container>
          <div className="container">
            <Contacts
              contacts={contacts}
              changeChat={handleChatChange}
              currentUser={currentUser}
            ></Contacts>
            {currentChat === undefined ? (
              <Welcome currentUser={currentUser} />
            ) : (
              <ChatContainer socket={socket} currentChat={currentChat} />
            )}
          </div>
        </Container>
      ) : (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
