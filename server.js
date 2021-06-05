const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//GET - Read all messages
app.get("/messages", (req, res) => {
  res.send(messages);
});

//GET - Read one message specified by an ID
app.get("/messages/:id", (req, res) => {
  //Take the ID number specified in the URL address
  const id = parseInt(req.params.id);
  //Look through the messages to find the message by ID
  const messageByID = messages.find((message) => message.id == id);
  //Return that message
  res.send(messageByID);
});

//POST - Create a new message
app.post("");

//DELETE - Delete a message, by ID

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
