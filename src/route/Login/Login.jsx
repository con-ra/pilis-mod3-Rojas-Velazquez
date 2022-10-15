import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import './Login.css';

const Login = () => {
  const { setCurrentUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  let dataStored;
  let dataParsed;
  let dataToStorage;

  useEffect(() => {
    dataStored = localStorage.getItem('data');

    if (dataStored) {
      dataParsed = JSON.parse(dataStored);
    }

    if (!dataStored) {
      dataToStorage = {
        user: {},
        weathers: [],
      };
    }
  }, []);

  const onSubmit = (user) => {
    if (!dataParsed) {
      dataToStorage.user = {
        username: user.username,
        password: user.password,
      };
      localStorage.setItem('data', JSON.stringify(dataToStorage));
    }

    if (dataParsed) {
      dataParsed.user = {
        username: user.username,
        password: user.password,
      };
      localStorage.setItem('data', JSON.stringify(dataParsed));
    }

    setCurrentUser(user);
    navigate('/');
  };

  return (
    <div className="sign-in-container">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="form-welcome">
          Welcome Back!
          <span className="form-subtitule">Login to your account.</span>
        </h3>
        <label>Username</label>
        <input
          className="input-form"
          type="text"
          placeholder="por ej. sebatech@gmail.com"
          {...register('username', {
            required: 'You must enter your username',
          })}
        />
        <p>{errors.username?.message}</p>
        <label>Password</label>
        <input
          className="input-form"
          type="password"
          placeholder="min 6 characters"
          {...register('password', {
            required: 'Debe ingresar su contraseña',
          })}
        />
        <p>{errors.password?.message}</p>
        <button className="btn-form" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
