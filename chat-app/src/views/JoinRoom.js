import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../UserContext";
import { TextField, Paper, Typography, Alert } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import socket from "../utils/socket";
import { v4 as uuidv4 } from "uuid";

export default function JoinRoom() {
  const { username, setUsername } = useContext(userContext);
  const { room, setRoom } = useContext(userContext);
  const [ show, setShow] = useState(false);
  const { setID } = useContext(userContext);

  const navigate = useNavigate();

  useEffect(() => {
    socket.on("success", () => {
      saveToLocalStorage();
      navigate("/Chat");
    });

    socket.on("error", () => {
      setShow(true)
    });
  }, [username, room]);

  function saveToLocalStorage() {
    const generatedID = uuidv4();
    setID(generatedID);
    const userObject = {
      id: generatedID,
      room: room,
      username: username,
    };
    localStorage.setItem("usr", JSON.stringify(userObject));
  }

  function handleSubmit() {
    socket.emit("validateUsername", { room: room, username: username });
  }
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={20}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            padding: "30px 20px",
            width: 300,
            height: 400,
            margin: "20px auto",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "#3f51b5",
            }}
            component="h3"
          >
            Chat App
          </Typography>
          <TextField
            label="Room Code"
            variant="filled"
            required
            autoComplete="off"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <TextField
            label="Username"
            variant="filled"
            required
            value={username}
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
          />
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Join Room
            </Button>
          </div>

          {show && <Alert severity="error">Username already taken in Room</Alert>}
          
        </Paper>
      </Box>
    </>
  );
}
