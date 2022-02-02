import { Reducer } from "redux";
import { By, Order, OrderByRange, TimeRange } from "../generated/graphql";

export const SET_CURRENT_TIME_RANGE = "SET_CURENT_TIME_RANGE";
export const SET_CURRENT_BY = "SET_CURENT_BY";
export const SET_CURRENT_ORDER = "SET_CURENT_ORDER";

export interface OrderByRangeAction {
  type: string;
  payload: OrderByRange;
}

const initialState: OrderByRange = {
  by: By.Date,
  order: Order.Desc,
  range: TimeRange.Day,
};

export const orderByRangeReducer: Reducer<OrderByRange, OrderByRangeAction> = (
  state: OrderByRange = initialState,
  action: OrderByRangeAction
) => {
  switch (action.type) {
    case SET_CURRENT_TIME_RANGE:
      return { ...state, range: action.payload.range };
    case SET_CURRENT_BY:
      return { ...state, by: action.payload.by };
    case SET_CURRENT_ORDER:
      return { ...state, order: action.payload.order };
    default:
      return state;
  }
};
