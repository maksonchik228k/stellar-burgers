import { RootState } from '@services/store';
import { TOrder } from '@utils-types';

export const selectOrders = (state: RootState) => state.orders.orders;
export const selectUserOrders = (state: RootState) => state.orders.userOrders;
export const selectFeed = (state: RootState) => state.orders.feed;
export const selectCurrentOrder = (state: RootState) =>
  state.orders.currentOrder;
export const selectFeedsLoading = (state: RootState) =>
  state.orders.feedsLoading;
export const selectUserOrdersLoading = (state: RootState) =>
  state.orders.userOrdersLoading;
export const selectOrderByNumberLoading = (state: RootState) =>
  state.orders.orderByNumberLoading;
export const selectPlaceOrderLoading = (state: RootState) =>
  state.orders.placeOrderLoading;
export const selectOrderError = (state: RootState) => state.orders.error;
