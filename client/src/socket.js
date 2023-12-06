import { useContext } from "react";
import { io } from "socket.io-client";
import { msgContext } from "./context/context";

const socket = io("http://localhost:4000/");



export default socket
