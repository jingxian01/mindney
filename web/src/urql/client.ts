import { authExchange } from "@urql/exchange-auth";
import { Cache, cacheExchange, QueryInput } from "@urql/exchange-graphcache";
import { createClient, dedupExchange, fetchExchange } from "urql";
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "../generated/graphql";
import { store } from "../store/store";
import {
  addAuthToOperation,
  getAuth,
  willAuthError,
} from "./authExchange.utils";

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
      resolvers: {
        Query: {
          // getSpendsByRange: cursorPagination(),
        },
      },
      updates: {
        Mutation: {
          createSpend: (_result, _args, cache, _info) => {
            const state = store.getState();
            cache.invalidate("Query", "getSpendsByRange", {
              limit: 10,
              orderByRange: state.orderByRange,
            });
          },
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
          login: (_result, _args, cache, _info) => {
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
          logout: (_result, _args, cache, _info) => {
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
      addAuthToOperation,
      willAuthError,
      getAuth,
    }),
    fetchExchange,
  ],
});
