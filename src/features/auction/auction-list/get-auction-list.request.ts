import { userFetchClient } from "@/shared/config/user-fetch-client";

interface GetAuctionListRequestResponse {
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

export const getAuctionListRequest =
  async (): Promise<GetAuctionListRequestResponse> => {
    const response = await userFetchClient.get("/auctions");
    return response.data;
  };
