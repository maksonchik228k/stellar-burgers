import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import {
  ingredientsReducer,
  burgerConstructorReducer,
  ordersReducer,
  authReducer
} from '@slices';
import {
  TIngredient,
  TConstructorIngredient,
  TOrder,
  TUser
} from '@utils-types';

const rootReducer = {
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  orders: ordersReducer,
  auth: authReducer
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = {
  ingredients: {
    ingredients: TIngredient[];
    isLoading: boolean;
    error: string | null;
  };
  burgerConstructor: {
    constructorItems: {
      bun: TIngredient | null;
      ingredients: TConstructorIngredient[];
    };
    orderRequest: boolean;
    orderModalData: TOrder | null;
    error: string | null;
  };
  orders: {
    orders: TOrder[];
    userOrders: TOrder[];
    feed: { total: number; totalToday: number } | null;
    currentOrder: TOrder | null;
    feedsLoading: boolean;
    userOrdersLoading: boolean;
    orderByNumberLoading: boolean;
    placeOrderLoading: boolean;
    error: string | null;
  };
  auth: {
    user: TUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  };
};

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
