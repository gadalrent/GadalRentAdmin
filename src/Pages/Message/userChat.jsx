import React, { useState, useEffect, useRef, useCallback } from "react";
import User from "../../Components/Message/User";
import Axios from "axios";
import { api } from "../../Private/api";
import { io } from "socket.io-client";
import useAuth from "../../utils/useAuth";
function UserChat() {
  // const [user_id, setuser_id] = useState();
  const {user_id} = useAuth()
  // const [user, setUser] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState();
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io(`ws://${api.socket}`);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
    currentChat?.members.some((memb) => memb._id === arrivalMessage.sender)
      ? setMessages([...messages, arrivalMessage])
      : console.log();
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    // setuser_id(localStorage.getItem("id"));
    user_id ? socket.current.emit("addUser", user_id) : console.log();
    user_id ? socket.current.on("getUsers", (users) => {}) : console.log();
  }, [user_id]);

  useEffect(() => {
    // setuser_id(localStorage.getItem("id"));
    user_id ? getConversation() : console.log("");
  }, [user_id]);

  useEffect(() => {
    const getMessages = async () => {
      const res = await Axios.get(`${api.baseUrl}/messages/${currentChat?._id}`)
        .then((res) => {
          setMessages(res.data);
        })
        .catch((err) => console.log(err));
    };
    getMessages();
  }, [currentChat]);
  // useEffect(() => {
  //   for (var i in conversation) {
  //     console.log(
  //       conversation[i].members.find((member) => member._id !== user_id).name
  //     );
  //   }
  // }, [conversation]);
  const getConversation = async () => {
    const res = await Axios.get(`${api.baseUrl}/conversation/${user_id}`)
      .then((res) => {
        setConversation(res.data);
      })
      .catch((err) => console.log(err));
  };
  const lastConversation = async () => {
    await Axios.patch(`${api.baseUrl}/conversation`, {
      conversationId: currentChat._id,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.value = "";
    const message = {
      conversationId: currentChat._id,
      sender: user_id,
      text: newMessage,
    };

    if (newMessage) {
      try {
        Axios.post(`${api.baseUrl}/messages`, message)
          .then((res) => {
            setMessages([...messages, res.data]);
            setNewMessage();
          })
          .then((res) => {
            console.log(res.data);
          });
      } catch (err) {
        console.log(err);
      }
    }
    const mee = {
      senderId: user_id,
      receiverId: currentChat.members.find((member) => member._id !== user_id),
      text: newMessage,
    };
    setNewMessage("");
    socket.current.emit("sendMessage", mee);
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <React.Fragment>
      <div>
        <div
          style={{ height: "90vh", overflow: "hidden",marginLeft:'40px'}}
          className="container  p-6 mx-auto mb-16 "

        >
          <div className="min-w-full bg-gray-100 border rounded lg:grid lg:grid-cols-3">
            <div className="border-r border-gray-300 lg:col-span-1">
              <div className="mx-3 my-3">
                <div className="relative text-gray-600">
                  {/* <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      className="w-6 h-6 text-gray-300"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </span> */}
                  {/* <input
                    type="search"
                    className="block w-full py-2 pl-10 bg-gray-300 rounded outline-none"
                    name="search"
                    placeholder="Search"
                    required
                  /> */}
                </div>
              </div>

              <ul className="overflow-auto " style={{ height: "50vh" }}>
                <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>

                {conversation.map((c) => (
                  <div
                    key={c._id}
                    onClick={() => {
                      lastConversation();
                      setCurrentChat(c);
                      setCurrentUser(
                        c.members.find((member) => member._id !== user_id)
                      );
                    }}
                  >
                    <User
                      name={
                        c.members.find((member) => member._id !== user_id).name
                      }
                      lastMessage={c.lastMessage?.text}
                      lastSeen={c.seen}
                      isSelected={
                        false
                        // c.members.find((member) => member._id !== user_id)
                        //   ._id === currentChat._id
                      }
                    />
                  </div>
                ))}
              </ul>
            </div>
            {currentChat ? (
              <>
                <div className="lg:col-span-2 lg:block">
                  <div className="w-full">
                    <div className="relative flex items-center p-3 border-b border-gray-300">
                      <img
                        className="object-cover w-10 h-10 rounded-full"
                        src="https://www.ctvalleybrewing.com/wp-content/uploads/2017/04/avatar-placeholder.png"
                        alt="username"
                      />
                      <span className="block ml-2 font-bold text-gray-600">
                        {currentUser.name}
                      </span>
                      <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
                    </div>

                    <div className="relative w-full p-6 overflow-y-auto h-[25rem]">
                      <ul className="space-y-2">
                        {messages.map((m) => (
                          <div key={m._id} ref={scrollRef}>
                            <div
                              className={
                                m.sender === user_id
                                  ? "flex justify-end"
                                  : "flex justify-start"
                              }
                            >
                              <div
                                className={
                                  m.sender === user_id
                                    ? "relative max-w-xl px-4 py-2 text-gray-700 bg-gray-300 rounded shadow"
                                    : "relative max-w-xl px-4 py-2 text-gray-700 rounded shadow"
                                }
                              >
                                <span className="block">{m.text}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </ul>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                        {/* <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                      */}

                        <input
                          id="message"
                          type="text"
                          placeholder="Message"
                          className="block w-full py-2 pl-4 mx-3 bg-gray-300 rounded-full outline-none focus:text-gray-700"
                          name="message"
                          value={newMessage}
                          onChange={(e) => {
                            setNewMessage(e.target.value);
                          }}
                        />
                        {/* <button >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                          />
                        </svg>
                      </button> */}
                        <button type="submit">
                          <svg
                            className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                          </svg>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </>
            ) : (
              <div className="mx-auto my-auto">
                <p className="text-center">Select a chat to start messaging</p>
              </div>
            )}
          </div>
        </div>

        <hr />
      </div>
    </React.Fragment>
  );
}

export default UserChat;
