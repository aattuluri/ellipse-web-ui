import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://139.59.16.53:4000/");
export default socket;