import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
export const socket = io(SOCKET_URL);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const subscribeToAuctions = (callback: (...args: any[]) => void) => {
  socket.on("created-auction", callback);
  return () => socket.off("created-auction", callback);
};

export const emitAuctionCreated = (auctionId: string) => {
  socket.emit("create-auction", auctionId);
};
