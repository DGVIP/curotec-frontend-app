import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { LoginFormOutput, useLoginForm } from "./use-login-form.hook";
import { loginRequest, LoginRequestParams } from "./login.request";
import { getErrorMessage } from "@/shared/utils/get-error-message";

export const LoginScreen = () => {
  const form = useLoginForm();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (params: LoginRequestParams) => {
      const response = await loginRequest(params);
      localStorage.setItem("access_token", response.accessToken);
    },
    onSuccess: () => {
      navigate({ to: "/home" });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      alert(errorMessage ?? "An error occurred");
    },
  });

  const handleFormSubmit = async (formData: LoginFormOutput) => {
    await loginMutation.mutateAsync({ body: formData });
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
              disabled={loginMutation.isPending}
            >
              Login
            </Button>

            <div className="mt-4 text-center text-sm">
              {"Don't have an account? "}
              <Link to="/register" className="underline underline-offset-4">
                Register
              </Link>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};
