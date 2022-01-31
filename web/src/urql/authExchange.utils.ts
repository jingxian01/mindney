import { makeOperation } from "@urql/core";
import jwtDecode from "jwt-decode";
import { getAccessToken, setAccessToken } from "../utils/accessToken";

export const addAuthToOperation = ({ authState, operation }: any) => {
  // if no auth state, return operation without header
  if (!authState || !authState.token) {
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
        Authorization: `Bearer ${authState.token}`,
      },
    },
  });
};

export const willAuthError = ({ authState }: any) => {
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
};

export const getAuth = async ({ authState }: any) => {
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
  const response = await fetch("http://localhost:4000/auth/refresh_token", {
    method: "POST",
    credentials: "include",
  });

  // access token has been refreshed
  const { accessToken }: any = await response.json();
  if (accessToken) {
    // console.log("get new access token and set it to local");
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
};
