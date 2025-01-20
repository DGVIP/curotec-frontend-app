import { useMutation } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/shared/utils/get-error-message";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { createBidRequest, CreateBidRequestParams } from "./create-bid.request";
import {
  CreateBidFormOutput,
  useCreateBidForm,
} from "./use-create-bid-form.hook";

interface CreateBidFormProps {
  auctionItemId: string;
}

export const CreateBidForm = (props: CreateBidFormProps) => {
  const { auctionItemId } = props;

  const form = useCreateBidForm();

  const createBidMutation = useMutation({
    mutationFn: (params: CreateBidRequestParams) => createBidRequest(params),
    onSuccess: () => {
      alert("Bid created successfully");
      form.reset();
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      alert(errorMessage ?? "An error occurred");
    },
  });

  const handleFormSubmit = async (data: CreateBidFormOutput) => {
    await createBidMutation.mutateAsync({
      body: {
        auctionItemId: auctionItemId,
        amount: Number(data.amount),
      },
    });
  };

  return (
    <div className="space-y-6 p-4 rounded-md border shadow-md">
      <h1 className="text-xl font-semibold">Create Bid</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Enter your bid amount"
                    className="text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={createBidMutation.isPending}
            className="w-full"
          >
            {createBidMutation.isPending
              ? "Submitting..."
              : "Bid for this item"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
