import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { router } from "./router";
import { useEffect } from "react";
import { subscribeToAuctions } from "./shared/services/socket-service";

const queryClient = new QueryClient();

export const App = () => {
  useEffect(() => {
    const unsubscribe = subscribeToAuctions((auctionId) => {
      alert(`Auction ${auctionId} created successfully`);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
