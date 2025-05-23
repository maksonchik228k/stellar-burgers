import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from '@services/store';
import {
  selectUserOrders,
  selectUserOrdersLoading,
  selectOrderError
} from '@selectors';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(selectUserOrders);
  const isLoading = useSelector(selectUserOrdersLoading);
  const error = useSelector(selectOrderError);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <div className='text text_type_main-medium text_color_error'>
        Ошибка загрузки: {error}
      </div>
    );
  }

  if (!orders.length) {
    return <div className='text text_type_main-medium'>Заказов пока нет</div>;
  }

  return <ProfileOrdersUI orders={orders} />;
};
