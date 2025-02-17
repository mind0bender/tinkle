import { io } from "socket.io-client";

const SERVER_URL: string =
  import.meta.env.VITE_SERVER_URL || "http://localhost:8080";

if (!SERVER_URL) {
  throw new Error("SERVER_URL is not set");
}
const socket = io(SERVER_URL);
export default socket;
