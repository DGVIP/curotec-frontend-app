import { useQuery } from "@tanstack/react-query";
import { getAuctionListRequest } from "./get-auction-list.request";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

const datetimeFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "long",
  timeStyle: "short",
});

const formatDatetime = (datetime: string) => {
  return datetimeFormatter.format(new Date(datetime));
};

export const AuctionListScreen = () => {
  const navigate = useNavigate();
  const getAuctionListQuery = useQuery({
    queryKey: ["auction-list"],
    queryFn: async () => {
      const response = await getAuctionListRequest();
      return response.auctions;
    },
  });

  if (getAuctionListQuery.isPending) {
    return <div>Loading...</div>;
  }

  if (getAuctionListQuery.isError) {
    return (
      <div>
        <p>Error: {getAuctionListQuery.error.message}</p>
        <Button onClick={() => getAuctionListQuery.refetch()}>Retry</Button>
      </div>
    );
  }

  const auctions = getAuctionListQuery.data;

  return (
    <div className="max-w-[1080px] mx-auto p-8 flex flex-col gap-4">
      <h2>Auction List</h2>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {auctions.map((auction) => (
          <Card key={auction.id} className="p-4 flex flex-col gap-4">
            <h3>{auction.title}</h3>
            <p>Created by: {auction.createdBy.username}</p>
            <p>Created at: {formatDatetime(auction.timestamp)}</p>
            <Button
              onClick={() =>
                navigate({
                  to: "/auctions/$auctionId",
                  params: { auctionId: auction.id },
                })
              }
            >
              View Details
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
