import { FC } from 'react';
import { useSelector } from '@services/store';
import { useParams } from 'react-router-dom';
import { selectIngredientById, selectIngredientsLoading } from '@selectors';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const isLoading = useSelector(selectIngredientsLoading);
  const ingredientData = useSelector(selectIngredientById(id!));

  if (isLoading || !ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
