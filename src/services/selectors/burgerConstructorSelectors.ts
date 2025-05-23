import type { RootState } from '../store';
import { TOrder, TConstructorIngredient, TIngredient } from '@utils-types';

export const selectConstructorItems = (
  state: RootState
): {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
} => state.burgerConstructor.constructorItems;

export const selectOrderRequest = (state: RootState): boolean =>
  state.burgerConstructor.orderRequest;

export const selectOrderModalData = (state: RootState): TOrder | null =>
  state.burgerConstructor.orderModalData;

export const selectConstructorError = (state: RootState): string | null =>
  state.burgerConstructor.error;
