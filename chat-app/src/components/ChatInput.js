import React from "react";
import { TextField } from "@mui/material";
export function ChatInput({ handleSubmit, message, setMessage }) {

  function isStringBlank(str) {
    return (!str || /^\s*$/.test(str));
  
  }
  
  return (
    <div className="chat-input div-centered">
      <TextField
        fullWidth
        label="Message"
        value={message}
        margin="normal"
        sx={{ backgroundColor: "white" }}
        autoComplete="off"
        id="Type here..."
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            setMessage(e.target.value);
            if(!isStringBlank(e.target.value)){
              handleSubmit();
            }
          }
        }}
        onChange={(e) => setMessage(e.target.value)}
      />
    </div>
  );
}
