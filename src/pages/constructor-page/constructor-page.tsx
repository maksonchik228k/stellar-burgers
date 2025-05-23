import { FC } from 'react';
import { useSelector } from '@services/store';
import { selectIngredientsLoading } from '@selectors';
import { ConstructorPageUI } from '@ui-pages';
import { Preloader } from '@ui';

export const ConstructorPage: FC = () => {
  const isIngredientsLoading = useSelector(selectIngredientsLoading);

  if (isIngredientsLoading) {
    return <Preloader />;
  }

  return <ConstructorPageUI isIngredientsLoading={isIngredientsLoading} />;
};
