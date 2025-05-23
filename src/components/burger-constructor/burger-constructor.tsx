import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from '@services/store';
import { useNavigate } from 'react-router-dom';
import {
  selectConstructorItems,
  selectConstructorOrderRequest,
  selectOrderModalData,
  selectIsAuthenticated
} from '@selectors';
import { placeOrderConstructor, resetOrderConstructor } from '@slices';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectConstructorOrderRequest) as boolean;
  const orderModalData = useSelector(selectOrderModalData);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!constructorItems) {
    return null;
  }

  const onOrderClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];
    dispatch(placeOrderConstructor(ingredientIds));
  };

  const closeOrderModal = () => {
    dispatch(resetOrderConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
