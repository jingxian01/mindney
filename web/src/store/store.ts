import { combineReducers, createStore } from "@reduxjs/toolkit";
import { orderByRangeReducer } from "./orderByRangeReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  orderByRange: orderByRangeReducer,
});

export const store = createStore(rootReducer, {});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
