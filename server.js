const express = require("express");
const cors = require("cors");
const { response } = require("express");
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

//GET - Read all messages.
app.get("/messages", (req, res) => {
  console.log("----all messages ----");
  res.send(messages);
});

//GET - Read only messages whose text contains a given substring: /messages/search?text=express
app.get("/messages/search", (req, res) => {
  //Get search string from the query params
  const searchText = req.query.text;
  //Search all of the messages to see if they contain the search string
  const filteredMessages = messages.filter((m) => m.text.includes(searchText));
  //Return found messages
  console.log("----------------");
  res.send(filteredMessages);
});

//GET - Read one message specified by an ID
app.get("/messages/:id", (req, res) => {
  //Take the ID number specified in the URL address
  const id = parseInt(req.params.id);
  //Look through the messages to find the message by ID
  const messageByID = messages.find((message) => message.id == id);

  //If there's no message by that ID, return status 404
  if (!messageByID) {
    return res.status(404).send();
  }
  //Return that message.
  res.send(messageByID);
});

//POST - Create a new message.
//Add validation - Reject requests to create messages if the message objects have an empty or missing text or from property. In this case your server should return a status code of 400
app.post("/messages", (req, res) => {
  //Create new message object with the new ID, and the form and text from the request body
  const lastMessageIndex = parseInt(messages.length - 1);
  const newID = messages[lastMessageIndex].id + 1;
  const body = req.body;
  const newMessage = {
    id: newID,
    from: body.from,
    text: body.text,
  };
  //Add it to the array of messages IF message contains all necessary elements
  if (newMessage.from && newMessage.text) {
    messages.push(newMessage);
    //Return success and console log the full array of messages
    console.log(messages);
    res.status(201).send(newMessage);
  } else {
    //If it doesn't have the necessary elements, return a status code of 400
    console.log(`Bad request`);
    res.status(400).send();
  }
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
