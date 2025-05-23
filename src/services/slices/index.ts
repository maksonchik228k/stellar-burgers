import authReducer from './authSlice';
import { burgerConstructorReducer } from './burgerConstructorSlice';
import ingredientsReducer from './ingredientsSlice';
import ordersReducer from './ordersSlice';

export {
  authReducer,
  burgerConstructorReducer,
  ingredientsReducer,
  ordersReducer
};

export { login, fetchUser, logout, updateUser } from './authSlice';

export {
  placeOrder as placeOrderConstructor,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  resetOrder as resetOrderConstructor
} from './burgerConstructorSlice';

export { fetchIngredients } from './ingredientsSlice';

export {
  fetchFeeds as fetchOrdersFeeds,
  fetchOrderByNumber as fetchOrderByNumberOrders,
  placeOrder as placeOrderOrders,
  fetchUserOrders,
  resetOrder as resetOrderOrders
} from './ordersSlice';
