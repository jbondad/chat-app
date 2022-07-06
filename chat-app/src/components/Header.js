import React, { Fragment, useState, useContext } from "react";
import { Button } from "@mui/material";
import { Modal, Box, AppBar, Toolbar, Typography } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import { purple } from "@mui/material/colors";
import { Theme } from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import socket from "../utils/socket";
import { userContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { CirclePicker } from "react-color";

export default function Header() {
  const [nameOpen, setNameOpen] = useState(false);
  const [newName, setNewName] = useState("");

  const { id, setUsername , room  } = useContext(userContext);
  const [colourOpen, setColourOpen] = useState(false);
  const [colour, setColour] = useState("");

  const [leaveConfirm, setLeaveConfirm] = useState(false);
  const navigate = useNavigate();

  const leaveRoom = () => {
    socket.emit("leaveRoom");
    navigate("/");
    handleLeaveClose();
    localStorage.clear();
  };

  const handleLeaveOpen = () => {
    setLeaveConfirm(true);
  };
  const handleLeaveClose = () => {
    setLeaveConfirm(false);
  };

  const handleNameOpen = () => {
    setNameOpen(true);
  };
  const handleNameClose = () => {
    setNameOpen(false);
  };

  const handleNameChange = () => {
    socket.emit("changeName", { newName, id });
    const userObject = JSON.parse(localStorage.getItem("usr"));
    userObject.username = newName;
    localStorage.setItem("usr", JSON.stringify(userObject));
    setUsername(newName);
    handleNameClose();
  };

  const handleColourChange = (color, event) => {
    const newColor = color.hex;
    setColour(newColor);
    socket.emit("changeColor", { newColor, id });
    handleColourClose();
  };

  const handleColourOpen = () => {
    setColourOpen(true);
  };
  const handleColourClose = () => {
    setColourOpen(false);
  };

  const toolBarStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  return (
    <>
      <Dialog open={colourOpen} onClose={handleColourClose}>
        <DialogTitle>Change Colour</DialogTitle>
        <DialogContent>
          <CirclePicker color={colour} onChangeComplete={handleColourChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleColourClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={nameOpen} onClose={handleNameClose}>
        <DialogTitle>Change Name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNameClose}>Cancel</Button>
          <Button onClick={handleNameChange}>Confirm</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={leaveConfirm} onClose={handleLeaveClose}>
        <DialogTitle>Leave the Chat Room?</DialogTitle>
        <DialogActions>
          <Button onClick={handleLeaveClose}>Cancel</Button>
          <Button onClick={leaveRoom}>Yes</Button>
        </DialogActions>
      </Dialog>
      <AppBar position="relative" color="primary">
        <Toolbar sx={toolBarStyle}>
          <Typography variant="h6">ROOM: {room}</Typography>
          <Box
            component="div"
            sx={{
              display: "flex",
              gap: "15px",
            }}
          >
            <div className="icon-wrap" onClick={handleColourOpen}>
              <PaletteIcon></PaletteIcon>
            </div>
            <div className="icon-wrap" onClick={handleNameOpen}>
              <AccountCircleRoundedIcon></AccountCircleRoundedIcon>
            </div>
            <div className="icon-wrap" onClick={handleLeaveOpen}>
              <LogoutIcon></LogoutIcon>
            </div>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
