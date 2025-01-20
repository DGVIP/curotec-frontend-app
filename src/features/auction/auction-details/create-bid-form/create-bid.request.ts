import { userFetchClient } from "@/shared/config/user-fetch-client";

export interface CreateBidRequestParams {
  body: {
    auctionItemId: string;
    amount: number;
  };
}

interface CreateBidRequestResponse {
  bidId: string;
}

export const createBidRequest = async (
  params: CreateBidRequestParams,
): Promise<CreateBidRequestResponse> => {
  const { body } = params;
  const response = await userFetchClient.post("/bids", body);
  return response.data;
};
