const express = require("express");
const { Server } = require("socket.io");

const app = express();
const morgan = require("morgan");
const server = require("http").createServer(app);
const io = new Server(server);

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(morgan("short"));
app.use("/public", express.static("public"));

io.on("connection", (socket) => {
  console.log("socket connected");
  socket.on("message", (message) => {
    console.log(message);
    socket.broadcast.emit("message", message);
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(3000, () => {
  console.log("App running");
});
