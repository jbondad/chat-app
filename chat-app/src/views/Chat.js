import { Users } from "../components/Users";
import "./style.css";
import socket from "../utils/socket";
import { useEffect, useState, useRef, useContext } from "react";
import { userContext } from "../UserContext";
import Header from "../components/Header";
import { ChatInput } from "../components/ChatInput";
import { Grid } from "@mui/material";
import Message from "../components/Message";
import { MessageList } from "../components/MessageList";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [userList, setUserList] = useState([]);
  const { username, setUsername } = useContext(userContext);
  const { room, setRoom } = useContext(userContext);
  const { id, setID } = useContext(userContext);


  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("joinRoom", { room: room, username: username, id: id });
    }
  };

  useEffect(() => {
    joinRoom();
  }, []);

  useEffect(() => {
    socket.on("message", (data) => {
      setMessageList((prevState) => [...prevState, data]);
    });

    socket.on("initialMessageList", (data) => {
      setMessageList(data);
    });

    socket.on("updateUsers", (data) => {
      setUserList(data);
    });
  }, []);


  const handleSubmit = async (event) => {
    const messageData = {
      room: room,
      id: id,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
      message: message,
    };
    await socket.emit("chat message", messageData);
    setMessage("");
  };

  return (
    <>
      <Header></Header>
      <Grid
        container={true}
        sx={{
          width: "100%",
          height: "calc(100vh - 64px)",
        }}
      >
        <Grid item={true} xs={9}>
          <Grid container direction="column">
            <Grid
              item
              sx={{
                height: "calc(100vh - 156px)",
                position: "relative",
              }}
            >
              <MessageList messageList={messageList}></MessageList>
            </Grid>
            <Grid
              item
              sx={{
                minHeight: "92px",
              }}
            >
              <ChatInput
                handleSubmit={handleSubmit}
                message={message}
                setMessage={setMessage}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item={true} xs={3} sx={{ boxShadow: 3 }}>
          <Users handleSubmit={handleSubmit} userList={userList}></Users>
        </Grid>
      </Grid>
    </>
  );
}
