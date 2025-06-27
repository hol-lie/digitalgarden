const express = require("express"); //add express and make it available to our server
const app = express(); // call the function express, which starts express.
const server = require("http").Server(app); // attach our express app to the server thats going on the http protocol
const commsserver = require("socket.io")(server); // connect socket io and our server together so realtime comms can happen
const JSONdb = require("simple-json-db");
const db = new JSONdb("database.json");

app.use(express.static("public"));

// let newMessageArray = []
// let clientList = [];

commsserver.on("connection", async function (aperson) {
  // commsserver.emit("initialConnectStatusUpdate");
  commsserver.emit("personConnected", aperson.id);

  aperson.on("disconnect", function (reason) {
    commsserver.emit("personDisconnected", aperson.id);
  });

  aperson.on("newMessage", function (promptResponse) {
    // console.log(promptResponse);

    commsserver.emit("messageYell", promptResponse);
  });
});

let port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log("server is running on: " + port);
});
