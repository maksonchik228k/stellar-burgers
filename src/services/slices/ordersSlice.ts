import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getFeedsApi,
  getOrderByNumberApi,
  orderBurgerApi,
  getOrdersApi
} from '@api';
import { TOrder } from '@utils-types';

export const fetchFeeds = createAsyncThunk('orders/fetchFeeds', async () => {
  const response = await getFeedsApi();
  return response;
});

export const fetchOrderByNumber = createAsyncThunk(
  'orders/fetchOrderByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
);

export const placeOrder = createAsyncThunk(
  'orders/placeOrder',
  async (ingredientIds: string[]) => {
    const response = await orderBurgerApi(ingredientIds);
    return response.order;
  }
);

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async () => {
    const response = await getOrdersApi();
    return response;
  }
);

interface OrdersState {
  orders: TOrder[];
  userOrders: TOrder[];
  feed: { total: number; totalToday: number } | null;
  currentOrder: TOrder | null;
  feedsLoading: boolean;
  userOrdersLoading: boolean;
  orderByNumberLoading: boolean;
  placeOrderLoading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  userOrders: [],
  feed: null,
  currentOrder: null,
  feedsLoading: false,
  userOrdersLoading: false,
  orderByNumberLoading: false,
  placeOrderLoading: false,
  error: null
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.feedsLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.feedsLoading = false;
        state.orders = action.payload.orders;
        state.feed = {
          total: action.payload.total,
          totalToday: action.payload.totalToday
        };
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.feedsLoading = false;
        state.error = action.error.message || 'Failed to fetch feeds';
        state.orders = [];
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.orderByNumberLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.orderByNumberLoading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.orderByNumberLoading = false;
        state.error = action.error.message || 'Failed to fetch order';
      })
      .addCase(placeOrder.pending, (state) => {
        state.placeOrderLoading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.placeOrderLoading = false;
        state.currentOrder = action.payload;
        state.orders = [action.payload, ...state.orders];
        state.userOrders = [action.payload, ...state.userOrders];
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.placeOrderLoading = false;
        state.error = action.error.message || 'Failed to place order';
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.userOrdersLoading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.userOrdersLoading = false;
        state.userOrders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.userOrdersLoading = false;
        state.error = action.error.message || 'Failed to fetch user orders';
      });
  }
});

export const { resetOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
