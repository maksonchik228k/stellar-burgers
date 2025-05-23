import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from '@services/store';
import { logout } from '@slices';
import { ProfileMenuUI } from '@ui';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigate('/login', { replace: true });
    });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
