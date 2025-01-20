import { userFetchClient } from "@/shared/config/user-fetch-client";

export interface CreateAuctionRequestParams {
  body: CreateAuctionRequestBody;
}

interface CreateAuctionRequestBody {
  title: string;
  items: Array<{
    title: string;
    startPrice: number;
    startTime: string;
    endTime: string;
  }>;
}

interface CreateAuctionRequestResponse {
  auctionId: string;
}

export const createAuctionRequest = async (
  params: CreateAuctionRequestParams,
): Promise<CreateAuctionRequestResponse> => {
  const { body } = params;
  const response = await userFetchClient.post("/auctions", body);
  return response.data;
};
