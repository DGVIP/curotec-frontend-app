import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";

import { Card } from "@/components/ui/card";
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

import { registerRequest, RegisterRequestParams } from "./register.request";
import { RegisterFormOutput, useRegisterForm } from "./use-register-form.hook";

export const RegisterScreen = () => {
  const form = useRegisterForm();
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: async (params: RegisterRequestParams) => {
      const response = await registerRequest(params);
      console.log(response);
    },
    onSuccess: () => {
      navigate({ to: "/login" });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      alert(errorMessage ?? "An error occurred");
    },
  });

  const handleFormSubmit = (formData: RegisterFormOutput) => {
    registerMutation.mutate({ body: formData });
  };

  return (
    <div className="w-full p-4">
      <Card className="w-full max-w-md p-8 mx-auto">
        <Form {...form}>
          <form
            className="space-y-8"
            onSubmit={form.handleSubmit(handleFormSubmit)}
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={registerMutation.isPending}
            >
              Register
            </Button>

            <div className="mt-4 text-center text-sm">
              {"Already have an account? "}
              <Link to="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};
