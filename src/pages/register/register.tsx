import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '@services/store';
import { registerUserApi, loginUserApi } from '@api';
import { login } from '@slices';
import { RegisterUI } from '@ui-pages';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setErrorText('');
    registerUserApi({ name: userName, email, password })
      .then((res) => {
        dispatch(login({ email, password }));
        navigate('/', { replace: true });
      })
      .catch((err) => {
        setErrorText(err.message || 'Ошибка регистрации');
      });
  };

  return (
    <RegisterUI
      errorText={errorText}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
