import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

export default function Message({ username, time, message, userColor }) {
  return (
    <Card
      sx={{
        justifySelf: "flex-end",
        maxWidth: "max-content",
        paddingRight: "20px",
        bottom: 0,
      }}
    >
      <CardContent sx={{ padding: "10px" }}>
        <span>
          <Typography
            sx={{ display: "inline", fontSize: 14 }}
            color={userColor}
          >
            {username}
          </Typography>
          <Typography
            sx={{ display: "inline", fontSize: 14, paddingLeft: "0.2em" }}
            color="text.secondary"
          >
            {time}
          </Typography>
        </span>

        <Typography variant="body2">{message}</Typography>
      </CardContent>
    </Card>
  );
}
