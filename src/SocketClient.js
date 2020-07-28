// import socketIOClient from "socket.io-client";
// const socket = socketIOClient("http://localhost:4000/");
// export default socket;
const ws = new WebSocket("ws://localhost:4000/");
export default ws;