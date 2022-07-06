import React, { useEffect, useRef, useContext } from "react";
import { userContext } from "../UserContext";
import { List, ListItem } from "@mui/material";
import Message from "./Message";

export function MessageList({ messageList }) {
  const scrollRef = useRef(null);
  const { username } = useContext(userContext);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messageList]);
  function renderMessages() {
    const listItems = messageList.map((data, index) => (
      <ListItem
        sx={{
          display: "flex",
          justifyContent:
            data.user.username == username ? "flex-start" : "flex-end",
        }}
        key={index}
      >
        <Message
          username={data.user.username}
          time={data.time}
          message={data.message}
          userColor={data.user.color}
        />
      </ListItem>
    ));
    return listItems;
  }
  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
        bottom: "0px",
        padding: "0px",
        position: "absolute",
        direction: "rtl",
        maxHeight: "100%",
        overflow: "auto",
        width: "100%",
      }}
    >
      {renderMessages()}
      <li ref={scrollRef} />
    </List>
  );
}
