import { FC, PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '@services/store';
import { selectIsAuthenticated } from '@selectors';

interface ProtectedRouteProps {
  onlyUnAuth?: boolean;
}

export const ProtectedRoute: FC<PropsWithChildren<ProtectedRouteProps>> = ({
  onlyUnAuth = false,
  children
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();
  const from = location.state?.from || '/';

  if (onlyUnAuth && isAuthenticated) {
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
