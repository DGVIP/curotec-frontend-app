import { userFetchClient } from "@/shared/config/user-fetch-client";

export interface GetAuctionRequestParams {
  auctionId: string;
}

interface User {
  id: string;
  username: string;
}

interface GetAuctionRequestResponse {
  auction: {
    id: string;
    title: string;
    createdBy: User;
    items: Array<AuctionItemData>;
  };
}

export interface AuctionItemData {
  id: string;
  title: string;
  startPrice: number;
  startTime: string;
  endTime: string;
  currentBid: number;
  bidHistory: Array<BidHistoryData>;
}

export interface BidHistoryData {
  amount: number;
  user: User;
}

export const getAuctionRequest = async (
  params: GetAuctionRequestParams,
): Promise<GetAuctionRequestResponse> => {
  const { auctionId } = params;
  const response = await userFetchClient.get(`/auctions/${auctionId}`);
  return response.data;
};
