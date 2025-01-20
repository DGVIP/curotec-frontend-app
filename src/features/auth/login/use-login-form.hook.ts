import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters long." })
    .max(20, { message: "Username must not exceed 20 characters." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(20, { message: "Password must not exceed 20 characters." }),
});

export type LoginFormInput = z.input<typeof schema>;
export type LoginFormOutput = z.output<typeof schema>;

const defaultValues: LoginFormInput = {
  username: "",
  password: "",
};

export const useLoginForm = () => {
  return useForm<LoginFormInput, unknown, LoginFormOutput>({
    defaultValues,
    resolver: zodResolver(schema),
  });
};
