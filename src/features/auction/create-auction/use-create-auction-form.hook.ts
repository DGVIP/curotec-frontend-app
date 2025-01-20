import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

const schema = z.object({
  title: z.string().min(1),
  items: z
    .array(
      z.object({
        title: z.string().min(1),
        startPrice: z.string().min(1),
        startTime: z.string().min(1),
        endTime: z.string().min(1),
      })
    )
    .min(1, "Auction must have at least one item"),
});

export type CreateAuctionFormInput = z.input<typeof schema>;
export type CreateAuctionFormOutput = z.output<typeof schema>;

const defaultValues: CreateAuctionFormInput = {
  title: "",
  items: [],
};

export const useCreateAuctionForm = () => {
  const form = useForm<
    CreateAuctionFormInput,
    unknown,
    CreateAuctionFormOutput
  >({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const auctionItemsFieldArray = useFieldArray({
    control: form.control,
    name: "items",
  });

  return {
    form,
    auctionItemsFieldArray,
  };
};
