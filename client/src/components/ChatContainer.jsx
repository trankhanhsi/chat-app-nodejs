import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import { ChatInput } from "./ChatInput";

export const ChatContainer = ({ currentChat, currentUser, socket, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    if (currentChat) {
      async function fetchMessages() {
        const { data } = await axios.post(getAllMessagesRoute, {
          from: currentUser?._id,
          to: currentChat?._id,
        });

        setMessages(data);
      }

      fetchMessages();
    }
  }, [currentChat, currentUser]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  const handleGoBack = () => {
    onBack(undefined);
  };

  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <div className="back" onClick={handleGoBack}>
              <AiOutlineArrowLeft />
              <span>Back</span>
            </div>
          </div>
          <div className="chat-messages">
            {messages &&
              messages.map((message) => {
                return (
                  <div ref={scrollRef} key={uuidv4()}>
                    <div
                      className={`message ${
                        message.fromSelf ? "sended" : "received"
                      }`}
                    >
                      <div className="avatar">
                        <img
                          src={`data:image/svg+xml;base64,${
                            message.fromSelf
                              ? currentUser.avatarImage
                              : currentChat.avatarImage
                          }`}
                          alt="avatar"
                        />
                      </div>
                      <div className="content">
                        <p>{message.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    border-bottom: 1px solid #4e5d78;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
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
    .back {
      display: flex;
      align-items: center;
      color: #377dff;
      cursor: pointer;
      &:hover,
      &:focus {
        text-decoration: underline;
        color: #2c64cc;
      }
      svg {
        font-size: 1.2rem;
      }
      span {
        font-size: 1.5rem;
        padding-left: 0.2rem;
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      gap: 14px;
      height: 44px;
      .avatar {
        height: 100%;
        img {
          width: 44px;
          height: 44px;
          border-radius: 100%;
        }
      }
      .content {
        display: flex;
        align-items: center;
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 0.8rem;
        font-size: 1.1rem;
      }
    }
    .sended {
      justify-content: flex-end;
      .avatar {
        order: 1;
      }
      .content {
        color: #ffffff;
        background-color: #377dff;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
        border-bottom-left-radius: 1rem;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        color: #edeff2;
        background-color: #212833;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;
      }
    }
  }
`;
