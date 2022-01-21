import { Reducer } from "redux";
import { User } from "../generated/graphql";

export const SetUserProfile = "SET_USER";
export const RemoveUserProfile = "REMOVE_USER";

export interface UserAction {
  type: string;
  payload: User | null;
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const userReducer: Reducer<UserState, UserAction> = (
  state: UserState = initialState,
  action: UserAction
) => {
  switch (action.type) {
    case SetUserProfile:
      return { ...state, user: action.payload };
    case RemoveUserProfile:
      return initialState;
    default:
      return state;
  }
};
