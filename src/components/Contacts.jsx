import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import defaultAvatar from "../assets/defaultAvatar.png";
import { UserContext } from "../Context/UserContext.js";
import { FaExchangeAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Contacts({ changeChat }) {
  const { contacts, currentUser, userProfile, getContacts } =
    useContext(UserContext);
  let navigate = useNavigate();
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const setUserImageAndUserName = async () => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
      getContacts();
    }
  };
  const changeAvatar = () => {
    navigate("/setAvatar");
  };
  useEffect(() => {
    setUserImageAndUserName();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      <Container>
        <div className="brand">
          <img src={Logo} alt="logo" />
          <h3>snappy</h3>
        </div>
        <div className="contacts">
          {contacts.length > 0 ? (
            contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    {contact.avatarImage ? (
                      <img
                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                        alt="avatar"
                      />
                    ) : (
                      <img src={defaultAvatar} alt="defaultAvatar" />
                    )}
                  </div>

                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })
          ) : (
            <Container>
              <h4 className="no-contacts">
                You are n't have any contacts yet.
              </h4>
            </Container>
          )}
        </div>
        <div className="current-user">
          <div className="avatar">
            {currentUser.avatarImage ? (
              <img
                src={`data:image/svg+xml;base64,${userProfile.avatarImage}`}
                alt="avatar"
              />
            ) : (
              <img src={defaultAvatar} alt="defaultAvatar" />
            )}
            <Button onClick={changeAvatar}>
              <FaExchangeAlt />
            </Button>
          </div>
          <div className="username">
            <h2>{currentUser.username}</h2>
          </div>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .no-contacts {
    color: #fff;
    height: 100%;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .loader {
      height: 3rem;
      align-items: center;
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      position: relative;
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

const Button = styled.button`
  position: absolute;
  bottom: 0;
  right: -10px;
  padding: 0.3rem;
  border-radius: 0.3rem;
  background-color: #000;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1rem;
    color: yellow;
  }
`;
