import React, { useContext, useReducer, useEffect, useDebugValue } from 'react';
import useLocalStorage from 'react-use/lib/useLocalStorage';
import cookie from 'js-cookie';
import Router from 'next/router';
import {
  logout as authLogout,
  login as authLogin,
} from './../utils/authentication';

interface LoginState {
  userToken: string;
}
interface LoginContextProps {
  children: React.ReactNode;
}

enum LoginActionTypes {
  Login,
  Logout,
}

interface LoginAction {
  type: LoginActionTypes;
  payload?: LoginState;
}

// crear un context para tener un estado global del sitio respecto al estado de la sesion del usuario
const LoggedIn = React.createContext<
  [LoginState, React.Dispatch<LoginAction>] | undefined
>(undefined);
const { Provider } = LoggedIn;

// identificador del local-storage para usar como llave de acceso
const localStorageId = 'localStorageUserId';

export function useLoginContext() {
  const loginContext = useContext(LoggedIn);
  // manejo del local storage para guardar localmente la info para continuar sesiones al cerrar un tab
  const [userIdLocalStorage, setUserIdLocalStorage] = useLocalStorage(
    localStorageId,
    ''
  );

  // extraer informacion del contexto
  const userToken = loginContext?.[0].userToken;
  const dispatch = loginContext?.[1];

  // salir de la sesion
  function logout() {
    dispatch && dispatch({ type: LoginActionTypes.Logout });
    // funcion de logout de servicio de autenticacion
    authLogout();
    Router.push('/');
  }

  // inicio de sesion
  async function login(userIdentifier: string, userPassword: string) {
    const userData = await authLogin(userIdentifier, userPassword);

    if (userData) {
      dispatch &&
        dispatch({
          type: LoginActionTypes.Login,
          payload: { userToken: userData.userId },
        });
      Router.push('/');
    }
  }

  // cada que cambia el token del usuario, almacenar el token en localstorage
  useEffect(() => {
    if (userToken === userIdLocalStorage) return;

    setUserIdLocalStorage(userToken || '');
  }, [userToken]);

  return {
    userId: userIdLocalStorage,
    logout,
    login,
  };
}

function reducer(state: LoginState, action: LoginAction): LoginState {
  switch (action.type) {
    case LoginActionTypes.Login:
      if (action.payload) {
        const userToken = action.payload.userToken;

        return { ...state, userToken };
      }
      return { ...state };
    case LoginActionTypes.Logout:
      return { userToken: '' };
  }
}

function LoginContext({ children }: LoginContextProps) {
  const userId = cookie.get('token') || '';
  // use reducer es una alternativa a usestate
  // state => valor del token del usuario
  // dispatch => funcion que va a realizar el cambio
  const [state, dispatch] = useReducer(reducer, {
    userToken: userId,
  });

  return <Provider value={[state, dispatch]}>{children}</Provider>;
}

export default LoginContext;
