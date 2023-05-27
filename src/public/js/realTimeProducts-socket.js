const socket = io();

const chatBox = document.getElementById("titleId");
chatBox.addEventListener("keyup", ({ key }) => {
  if (key == "Enter") {
    socket.emit("msg_front_to_back", {
      msg: chatBox.value,
      user: nombre,
    });
    chatBox.value = "";
  }
});

/*socket.on("msg_server_to_front", (msg) => {
  console.log(msg);
});

socket.emit("msg_front_to_back", {
  author: "anonymous user",
  msg: "hola server",
});

socket.emit("data_dispositivo", {
  author: "anonymous user",
  so: "windows",
  version: 11,
  browser: "chrome",
});
*/
