import { isAxiosError } from "axios";

export const getErrorMessage = (error: unknown): string | null => {
  if (isAxiosError(error)) return error.response?.data.message ?? null;
  if (error instanceof Error) return error.message;
  return null;
};
