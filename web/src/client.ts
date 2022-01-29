import { makeOperation } from "@urql/core";
import { authExchange } from "@urql/exchange-auth";
import { Cache, cacheExchange, QueryInput } from "@urql/exchange-graphcache";
import jwtDecode from "jwt-decode";
import { createClient, dedupExchange, fetchExchange } from "urql";
import {
  CreateSpendMutation,
  GetSpendsByRangeDocument,
  GetSpendsByRangeQuery,
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
          // createSpend: (_result, args, cache, info) => {
          //   betterUpdateQuery<CreateSpendMutation, GetSpendsByRangeQuery>(
          //     cache,
          //     { query: GetSpendsByRangeDocument },
          //     _result,
          //     (result, query) => {
          //       return {
          //         getSpendsByRange: [result.createSpend],
          //       };
          //     }
          //   );
          // },
        },
      },
    }),
    authExchange({
      addAuthToOperation: ({ authState, operation }) => {
        // if no auth state, return operation without header
        const anyAuthState = authState as any;
        if (!anyAuthState || !anyAuthState.token) {
          // console.log("no auth");
          return operation;
        }

        // testing purpose
        // console.log(anyAuthState);
        // const anyOperation = operation as any;
        // console.log(anyOperation.query.definitions[0].name.value);

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
      getAuth: async ({ authState }) => {
        if (!authState) {
          const token = getAccessToken();
          // console.log(token + " from get auth");
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
          console.log("get new access token and set it to local");
          setAccessToken(accessToken);
          return {
            token: accessToken,
          };
        }

        // todos: logout
        // console.log("authState (getAuth bottom): " + authState);
        localStorage.clear();
        // console.log("auth state should be null");

        return null;
      },
    }),
    fetchExchange,
  ],
});
