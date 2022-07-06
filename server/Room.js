/**
 * Room object o manage the room sessions.
 */

module.exports = class Room {
  constructor(name) {
    this.roomName = name;
    this.usersList = new Map();
    this.messageList = [];
  }

  addUser(user) {
    if (!this.usersList.has(user.id)) {
      console.log("adding user");
      console.log(user);
      this.usersList.set(user.id, user);
      return true;
    } else {
      return "Username already in room";
    }
  }

  checkUsername(user) {
    for (const [key, value] of this.usersList.entries()) {
      if (value.username == user){
        return "Username already exists"
      }
    }
    return true;
  }

  removeUser(userID) {
    if (this.usersList.has(userID)) {
      this.usersList.delete(userID);
    }
  }

  getUser(userID) {
    console.log(userID);
    console.log(this.usersList);
    return this.usersList.get(userID);
  }

  addMessage(message) {
    this.messageList.push(message);
  }

  getName() {
    return this.roomName;
  }

  getUsers() {
    let output = [];
    for (const [key, value] of this.usersList.entries()) {
      output.push({ username: value.username, color: value.color });
    }
    console.log(output);
    return output;
  }

  getMessages() {
    return this.messageList;
  }
};
