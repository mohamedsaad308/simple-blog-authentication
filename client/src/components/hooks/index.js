import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const useAuthTokens = () => {
  const queryClient = useQueryClient();
  const tokens = queryClient.getQueryData("authTokens");

  useEffect(() => {
    if (!tokens) {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken && refreshToken) {
        const storedTokens = { access: accessToken, refresh: refreshToken };
        queryClient.setQueryData("authTokens", storedTokens);
      }
    }
  }, [tokens, queryClient]);

  return tokens;
};
