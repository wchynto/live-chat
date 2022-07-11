const submit_btn = document.querySelector(".submit");
const input = document.querySelector("#input");
const chat_container = document.querySelector(".chat");
const empty_mesage = document.querySelector(".empty-message");

const socket = io();

socket.on("connect", () => {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

function userMessage(msg) {
  const user_message = document.createElement("div");
  user_message.classList.add("user-message");
  const text = document.createElement("div");
  text.classList.add("text");
  user_message.appendChild(text);
  text.innerHTML = msg;
  chat_container.appendChild(user_message);

  if (chat_container.childElementCount > 1) {
    empty_mesage.remove();
  }
}

function serverMessage(msg) {
  const message = document.createElement("div");
  message.classList.add("message");
  const text = document.createElement("div");
  text.classList.add("text");
  message.appendChild(text);
  text.innerHTML = msg;
  chat_container.appendChild(message);

  if (chat_container.childElementCount > 1) {
    empty_mesage.remove();
  }
}

submit_btn.addEventListener("click", () => {
  userMessage(input.value);

  socket.emit("message", input.value);
  input.value = "";
});

socket.on("message", (message) => {
  serverMessage(message);
});
