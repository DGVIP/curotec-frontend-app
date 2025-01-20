import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DateTimeInput } from "@/components/ui/datetime-input";
import { getErrorMessage } from "@/shared/utils/get-error-message";
import { emitAuctionCreated } from "@/shared/services/socket-service";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  CreateAuctionFormOutput,
  useCreateAuctionForm,
} from "./use-create-auction-form.hook";
import {
  createAuctionRequest,
  CreateAuctionRequestParams,
} from "./create-auction.request";

export const CreateAuctionScreen = () => {
  const navigate = useNavigate();
  const { form, auctionItemsFieldArray } = useCreateAuctionForm();

  const createAuctionMutation = useMutation({
    mutationFn: async (params: CreateAuctionRequestParams) => {
      const response = await createAuctionRequest(params);
      return response.auctionId;
    },
    onSuccess: (data) => {
      const auctionId = data;
      emitAuctionCreated(auctionId);
      navigate({ to: `/auctions/${auctionId}` });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      alert(errorMessage ?? "An error occurred");
    },
  });

  const handleAddAuctionItem = () => {
    auctionItemsFieldArray.append({
      title: "",
      startPrice: "0",
      startTime: "",
      endTime: "",
    });
  };

  const removeAuctionItem = (index: number) => {
    auctionItemsFieldArray.remove(index);
  };

  const handleFormSubmit = async (formData: CreateAuctionFormOutput) => {
    await createAuctionMutation.mutateAsync({
      body: {
        title: formData.title,
        items: formData.items.map((item) => ({
          title: item.title,
          startPrice: Number(item.startPrice),
          startTime: item.startTime,
          endTime: item.endTime,
        })),
      },
    });
  };

  return (
    <div className="max-w-[1080px] mx-auto p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)}>
          <div className="flex flex-row justify-between gap-4 items-center">
            <h1>Create Auction</h1>
            <Button type="submit" disabled={createAuctionMutation.isPending}>
              Create
            </Button>
          </div>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-4">
            <h3>Auction Items:</h3>

            {auctionItemsFieldArray.fields.length === 0 ? (
              <Card className="p-4 text-center">
                <div>Add an item to your auction</div>
              </Card>
            ) : null}

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {auctionItemsFieldArray.fields.map((item, index) => (
                <Card key={item.id} className="p-4 flex flex-col gap-4">
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => removeAuctionItem(index)}
                    >
                      Remove
                    </Button>
                  </div>

                  <FormField
                    control={form.control}
                    name={`items.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`items.${index}.startPrice`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Price</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`items.${index}.startTime`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Time</FormLabel>
                          <FormControl>
                            <DateTimeInput {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`items.${index}.endTime`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Time</FormLabel>
                          <FormControl>
                            <DateTimeInput {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </Card>
              ))}
            </div>

            <Button type="button" onClick={handleAddAuctionItem}>
              Add Auction Item
            </Button>

            {form.formState.errors.items ? (
              <div>{form.formState.errors.items.message}</div>
            ) : null}
          </div>
        </form>
      </Form>
    </div>
  );
};
