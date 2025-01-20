import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CreateBidForm } from "./create-bid-form/create-bid-form";
import {
  AuctionItemData,
  BidHistoryData,
  getAuctionRequest,
} from "./get-auction.request";

export const AuctionDetailsScreen = () => {
  const auctionId = useParams({ from: "/auctions/$auctionId" }).auctionId;

  const getAuctionDetailsQuery = useQuery({
    queryKey: ["auction-details", auctionId],
    queryFn: async () => {
      const response = await getAuctionRequest({ auctionId });
      return response.auction;
    },
  });

  if (getAuctionDetailsQuery.isPending) {
    return (
      <div className="flex justify-center items-center h-full">
        <Skeleton className="w-80 h-20" />
      </div>
    );
  }

  if (getAuctionDetailsQuery.isError) {
    return (
      <div>
        <p>Error: {getAuctionDetailsQuery.error.message}</p>
        <Button onClick={() => getAuctionDetailsQuery.refetch()}>Retry</Button>
      </div>
    );
  }

  const auction = getAuctionDetailsQuery.data;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">{auction.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <AuctionItemList items={auction.items} />
        </CardContent>
      </Card>
    </div>
  );
};

interface AuctionItemListProps {
  items: AuctionItemData[];
}

const AuctionItemList = (props: AuctionItemListProps) => {
  const { items } = props;

  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <AuctionItem key={item.id} item={item} />
      ))}
    </div>
  );
};

interface AuctionItemProps {
  item: AuctionItemData;
}

const AuctionItem = (props: AuctionItemProps) => {
  const { item } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p>
              <strong>Start Price:</strong> ${item.startPrice}
            </p>
            <p>
              <strong>Start Time:</strong> {item.startTime}
            </p>
            <p>
              <strong>End Time:</strong> {item.endTime}
            </p>
            <p>
              <strong>Current Bid:</strong> ${item.currentBid}
            </p>
          </div>

          <div>
            <CreateBidForm auctionItemId={item.id} />
          </div>
        </div>

        <BidHistory bids={item.bidHistory} />
      </CardContent>
    </Card>
  );
};

interface BidHistoryProps {
  bids: BidHistoryData[];
}

const BidHistory = (props: BidHistoryProps) => {
  const { bids } = props;

  return (
    <div className="mt-4">
      <p>Bid History</p>
      <ul className="space-y-2">
        {bids.map((bid, index) => (
          <li key={index}>
            <p>
              ${bid.amount} - {bid.user.username}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
