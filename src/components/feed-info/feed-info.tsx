import { FC } from 'react';
import { useSelector } from '@services/store';
import { selectOrders, selectFeed, selectFeedsLoading } from '@selectors';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { Preloader } from '../ui/preloader';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useSelector(selectOrders) as TOrder[];
  const feed = useSelector(selectFeed) as {
    total: number;
    totalToday: number;
  } | null;
  const isLoading = useSelector(selectFeedsLoading);

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  if (isLoading || !feed) {
    return <Preloader />;
  }

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
