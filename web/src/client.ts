import { makeOperation } from "@urql/core";
import { authExchange } from "@urql/exchange-auth";
import jwtDecode from "jwt-decode";
import {
  createClient,
  dedupExchange,
  cacheExchange,
  fetchExchange,
} from "urql";
import "./index.css";
import { getAccessToken, setAccessToken } from "./utils/accessToken";

export const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    dedupExchange,
    cacheExchange,
    authExchange({
      addAuthToOperation: ({ authState, operation }) => {
        // if no auth state, return operation without header
        const anyAuthState = authState as any;
        if (!anyAuthState || !anyAuthState.token) {
          return operation;
        }

        // check fetchOptions type
        const fetchOptions =
          typeof operation.context.fetchOptions === "function"
            ? operation.context.fetchOptions()
            : operation.context.fetchOptions || {};

        // add header to operation
        return makeOperation(operation.kind, operation, {
          ...operation.context,
          fetchOptions: {
            ...fetchOptions,
            headers: {
              ...fetchOptions.headers,
              Authorization: `Bearer ${anyAuthState.token}`,
            },
          },
        });
      },
      getAuth: async ({ authState }) => {
        if (!authState) {
          const token = getAccessToken();
          if (token) {
            const { exp }: any = jwtDecode(token);
            if (Date.now() < exp * 1000) {
              return { token };
            }
          }
        }

        // refresh access token by calling refresh_token api and providing the refresh token in cookie
        const response = await fetch(
          "http://localhost:4000/auth/refresh_token",
          {
            method: "POST",
            credentials: "include",
          }
        );

        // access token has been refreshed
        const { accessToken }: any = await response.json();
        if (accessToken) {
          setAccessToken(accessToken);
          return {
            token: accessToken,
          };
        }

        // todos: logout
        localStorage.clear();

        return null;
      },
      willAuthError: ({ authState }) => {
        const anyAuthState = authState as any;
        if (!anyAuthState) {
          return true;
        }

        if (anyAuthState) {
          // check if access token is expired
          const { exp }: any = jwtDecode(anyAuthState.token);
          return Date.now() >= exp * 1000;
        }

        return false;
      },
    }),
    fetchExchange,
  ],
});
