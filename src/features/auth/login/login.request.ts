import { authFetchClient } from "@/shared/config/auth-fetch-client";

export interface LoginRequestParams {
  body: LoginRequestBody;
}

interface LoginRequestBody {
  username: string;
  password: string;
}

interface LoginRequestResponse {
  accessToken: string;
}

export const loginRequest = async (
  params: LoginRequestParams,
): Promise<LoginRequestResponse> => {
  const { body } = params;
  const response = await authFetchClient.post("/auth/login", body);
  return response.data;
};
