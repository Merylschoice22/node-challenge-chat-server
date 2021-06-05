const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

//To use the tester app: Go to the website. At the top there's a place to set the API. In the "new endpoint..." input, type the URL http://localhost:3000 and add the appropriate endpoint

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
  //Return that message.
  res.send(messageByID);
});

//POST - Create a new message
app.post("/messages", (req, res) => {
  //Create new message object
  const lastMessageIndex = parseInt(messages.length - 1);
  const newID = messages[lastMessageIndex].id + 1;
  const body = req.body;
  const newMessage = {
    id: newID,
    from: body.from,
    text: body.text,
  };
  //Add it to the array of messages
  messages.push(newMessage);
  //Return success and console log the full array of messages
  // console.log(newMessage);
  console.log(messages);
  res.status(201).send(newMessage);
});

//DELETE - Delete a message, by ID
app.delete("/messages/:id", (req, res) => {
  //Identify message by ID and index
  const id = parseInt(req.params.id);
  const index = messages.findIndex((message) => message.id == id);
  //Remove message by index from array
  messages.splice(index, 1);
  //Return successful deletion and console log full array of messages
  res.status(200).send(`Message successfully`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
