/**
 * User object
 */

const default_color = "#2196f3";

module.exports = class User {
  constructor(id, username) {
    this.id = id;
    this.username = username;
    this.color = default_color;
  }

  changeUsername(newName) {
    this.username = newName;
  }

  changeColor(newColor) {
    console.log(`this is the new color ${newColor}`);
    this.color = newColor;
  }
  
};
