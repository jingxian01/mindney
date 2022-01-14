import { makeOperation } from "@urql/core";
import { authExchange } from "@urql/exchange-auth";
import { cacheExchange, Cache, QueryInput } from "@urql/exchange-graphcache";
import jwtDecode from "jwt-decode";
import { createClient, dedupExchange, fetchExchange } from "urql";
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "./generated/graphql";
import "./index.css";
import { getAccessToken, setAccessToken } from "./utils/accessToken";

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

export const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.fieldError) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              }
            );
          },
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.fieldError) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              }
            );
          },
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          },
        },
      },
    }),
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
