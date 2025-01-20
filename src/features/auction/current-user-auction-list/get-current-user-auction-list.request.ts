import { userFetchClient } from "@/shared/config/user-fetch-client";

interface GetCurrentUserAuctionListRequestResponse {
  auctions: Array<{
    id: string;
    title: string;
    timestamp: string;
    createdBy: {
      id: string;
      username: string;
    };
  }>;
}

export const getCurrentUserAuctionListRequest =
  async (): Promise<GetCurrentUserAuctionListRequestResponse> => {
    const response = await userFetchClient.get("/auctions/current");
    return response.data;
  };
