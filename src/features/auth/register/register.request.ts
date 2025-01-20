import { authFetchClient } from "@/shared/config/auth-fetch-client";

export interface RegisterRequestParams {
  body: RegisterRequestBody;
}

interface RegisterRequestBody {
  username: string;
  password: string;
}

interface RegisterRequestResponse {
  accessToken: string;
}

export const registerRequest = async (
  params: RegisterRequestParams,
): Promise<RegisterRequestResponse> => {
  const { body } = params;
  const response = await authFetchClient.post("/auth/register", body);
  return response.data;
};
