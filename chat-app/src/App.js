import JoinRoom from "./views/JoinRoom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./views/Chat";
import { userContext } from "./UserContext";
import { useEffect, useState } from "react";
import "@fontsource/roboto";
import socket from "./utils/socket";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material";


const customTheme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

function App() {
  const [id, setID] = useState("");
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    initializeActiveUser();
  }, []);

  function initializeActiveUser() {
    const activeUser = localStorage.getItem("usr") !== null;
    console.log(activeUser);
    if (activeUser) {
      const userObject = JSON.parse(localStorage.getItem("usr"));
      console.log(userObject);
      setUsername(userObject.username);
      setRoom(userObject.room);
      setID(userObject.id);
      socket.emit("joinRoom", {
        room: userObject.room,
        username: userObject.username,
        id: userObject.id,
      });
    }
  }

  return (
    <ThemeProvider theme={customTheme}>
      <Router>
        <userContext.Provider
          value={{ username, setUsername, room, setRoom, id, setID }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <JoinRoom />
                </PrivateRoute>
              }
            />
            <Route path="/Chat" element={<Chat />} />
          </Routes>
        </userContext.Provider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
