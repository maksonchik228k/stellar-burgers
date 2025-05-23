import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import { useDispatch, useSelector } from '@services/store';
import {
  fetchIngredients,
  fetchUser,
  fetchOrdersFeeds,
  fetchUserOrders
} from '@slices';
import {
  selectIngredients,
  selectIsAuthenticated,
  selectOrders,
  selectUserOrders
} from '@selectors';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { AppHeader, Modal, ProtectedRoute } from '@components';
import { IngredientDetails, OrderInfo } from '@components';
import { getCookie } from '@utils/cookie';
import orderInfoStyles from '../ui/order-info/order-info.module.css';
import '../../index.css';
import styles from './app.module.css';

const AppContent = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);
  const orders = useSelector(selectOrders);
  const userOrders = useSelector(selectUserOrders);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    if (accessToken && !isAuthenticated) {
      dispatch(fetchUser());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && location.pathname === '/login') {
      const from = location.state?.from || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, location, navigate]);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients]);

  useEffect(() => {
    if (!orders.length) {
      dispatch(fetchOrdersFeeds());
    }
  }, [dispatch, orders]);

  useEffect(() => {
    if (isAuthenticated && !userOrders.length) {
      dispatch(fetchUserOrders());
    }
  }, [dispatch, isAuthenticated, userOrders]);

  const background = location.state?.background;
  const handleModalClose = () => {
    navigate(-1);
  };

  const OrderInfoWithId = () => {
    const { number } = useParams();
    return (
      <>
        <p
          className={`text text_type_digits-default mb-4 ${orderInfoStyles.number}`}
        >
          #{String(number).padStart(6, '0')}
        </p>
        <OrderInfo />
      </>
    );
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfoWithId />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfoWithId />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали заказа' onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title='Детали заказа' onClose={handleModalClose}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
