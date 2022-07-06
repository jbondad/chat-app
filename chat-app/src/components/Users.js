import React from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
export function Users({ userList }) {
  function renderUsers() {
    const listItems = userList.map((data, index) => (
      <ListItem key={index}>
        <ListItemAvatar>
          <Avatar />
        </ListItemAvatar>
        <ListItemText sx={{color:data.color}} primary={data.username} />
      </ListItem>
    ));
    return listItems;
  }
  return <List>{renderUsers()}</List>;
}
