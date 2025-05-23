import { FC } from 'react';
import { useSelector } from '@services/store';
import { selectUser } from '@selectors';
import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  const user = useSelector(selectUser);
  const userName = user?.name || '';

  return <AppHeaderUI userName={userName} />;
};
