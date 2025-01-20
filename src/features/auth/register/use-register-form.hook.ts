import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

export type RegisterFormInput = z.input<typeof schema>;
export type RegisterFormOutput = z.output<typeof schema>;

const defaultValues: RegisterFormInput = {
  username: "",
  password: "",
};

export const useRegisterForm = () => {
  return useForm<RegisterFormInput, unknown, RegisterFormOutput>({
    defaultValues,
    resolver: zodResolver(schema),
  });
};
