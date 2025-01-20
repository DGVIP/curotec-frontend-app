import { io } from "socket.io-client";

export const socket = io("http://localhost:3000");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const subscribeToAuctions = (callback: (...args: any[]) => void) => {
  socket.on("created-auction", callback);
  return () => socket.off("created-auction", callback);
};

export const emitAuctionCreated = (auctionId: string) => {
  socket.emit("create-auction", auctionId);
};
