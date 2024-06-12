import { useQueryClient } from "@tanstack/react-query";

export const useAuthTokens = () => {
  const queryClient = useQueryClient();
  const tokens = queryClient.getQueryData("authTokens");
  return tokens;
};
