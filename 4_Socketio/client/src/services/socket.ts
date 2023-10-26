import { io } from "socket.io-client";

/*
* Sockets client initialization
* https://socket.io/docs/v4/client-initialization/
*/
const socket = io(import.meta.env.VITE_API_URL);

export { socket }

