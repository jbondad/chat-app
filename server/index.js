const express = require("express");
const { Http2ServerRequest } = require("http2");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

const PORT = process.env.PORT || 8888;
const URL = `http://localhost:${PORT}/`;

const Room = require("./Room");
const User = require("./User");

let roomCollection = new Map();

server.listen(PORT, () => {
  console.log(`Listening on ${URL}`);
});

io.on("connection", (socket) => {
  socket.on("validateUsername", (data) => {
    if (!roomCollection.has(data.room)) {
      io.to(socket.id).emit("success", "success");
    } else {
      room = roomCollection.get(data.room);
      const resp = room.checkUsername(data.username);
      if (typeof resp === "string") {
        io.to(socket.id).emit("error", "Username taken");
      } else {
        io.to(socket.id).emit("success", "success");
      }
    }
  });

  socket.on("joinRoom", (data) => {
    socket.userID = data.id;
    socket.room = data.room;
    socket.join(data.room);
    let room;
    if (!roomCollection.has(data.room)) {
      room = new Room(data.room);
      roomCollection.set(data.room, room);
    } else {
      room = roomCollection.get(data.room);
    }
    const user = new User(data.id, data.username);
    room.addUser(user);
    io.to(room.roomName).emit("updateUsers", room.getUsers());
    io.to(socket.id).emit("initialMessageList", room.getMessages());
  });

  socket.on("changeName", (data) => {
    let room = roomCollection.get(socket.room);
    room.getUser(data.id).changeUsername(data.newName);
    const messages = room.getMessages();

    messages.map((message) => {
      if(message.user.id == data.id) {
        message.user.username = data.newName;
      }
    });
    io.to(room.roomName).emit("updateUsers", room.getUsers());
    io.to(room.roomName).emit("initialMessageList", room.getMessages());
  });

  socket.on("changeColor", (data) => {
    console.log(`${data.id} color changed to ${data.newColor}`);
    let room = roomCollection.get(socket.room);
    room.getUser(data.id).changeColor(data.newColor);

    const messages = room.getMessages();

    messages.map((message) => {
      if(message.user.id == data.id) {
        message.user.color= data.newColor;
      }
    });
    io.to(room.roomName).emit("updateUsers", room.getUsers());
    io.to(room.roomName).emit("initialMessageList", room.getMessages());
  });

  socket.on("leaveRoom", () => {
    if (socket.userID) {
      leaveRoom(socket);
    }
  });

  socket.on("disconnect", () => {
    if (socket.userID) {
      leaveRoom(socket);
    }
  });


  socket.on("chat message", (data) => {
    console.log(
      `Recieved message ${data.id} : ${data.message} from room ${data.room}`
    );
    let room = roomCollection.get(data.room);
    const messageObject = {
      user: room.getUser(data.id),
      message: data.message,
      time: data.time,
    };
    room.addMessage(messageObject);
    console.log(messageObject);
    io.in(data.room).emit("message", messageObject);
  });
});

function leaveRoom(socket) {
  let room = roomCollection.get(socket.room);
  room.removeUser(socket.userID);
  io.to(room.roomName).emit("updateUsers", room.getUsers());
}




