import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  amount: z.string().min(1),
});

export type CreateBidFormInput = z.input<typeof schema>;
export type CreateBidFormOutput = z.output<typeof schema>;

const defaultValues: CreateBidFormInput = {
  amount: "",
};

export const useCreateBidForm = () => {
  return useForm<CreateBidFormInput, unknown, CreateBidFormOutput>({
    defaultValues,
    resolver: zodResolver(schema),
  });
};
