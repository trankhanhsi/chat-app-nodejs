import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { Logout } from "./Logout";

export default function Contacts({ contacts, currentUser, onChatChange }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const handleChangeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    onChatChange && onChatChange(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>S-Chat</h3>
          </div>
          <div className="contacts">
            {contacts &&
              contacts.map((contact, index) => {
                return (
                  <div
                    className={`contact ${
                      index === currentSelected ? "selected" : ""
                    }`}
                    key={index}
                    onClick={() => handleChangeCurrentChat(index, contact)}
                  >
                    <div className="avatar">
                      <img
                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                        alt="avatar"
                      />
                    </div>
                    <div className="username">
                      <h3>{contact.username}</h3>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
            <Logout />
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  border-bottom-left-radius: 1rem;
  border-top-left-radius: 1rem;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      color: #edeff2;
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
    .contact {
      background-color: #191c21;
      min-height: 3rem;
      width: 90%;
      border-radius: 10px;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      justify-content: flex-start;
      transition: 0.5s ease-in-out;
      cursor: pointer;
      .avatar {
        height: 3rem;
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: #edeff2;
        }
      }
    }
    .selected {
      background-color: #212833;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;
    padding: 0.4rem;
    min-height: 3rem;
    .avatar {
      height: 3rem;
      img {
        height: 3rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: #edeff2;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        font-size: 1rem;
      }
    }
  }
`;
