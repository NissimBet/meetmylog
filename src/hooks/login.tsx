import React, { useContext, useReducer, useEffect, useDebugValue } from 'react';
import useLocalStorage from 'react-use/lib/useLocalStorage';
import Router from 'next/router';
import {
  logout as authLogout,
  login as authLogin,
} from './../utils/authentication';

interface LoginState {
  userId: string;
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

// hook para tener en cualquier parte del sitio el acceso al context, con las funciones y el valor del id del usuario
export function useLoginContext() {
  const loginContext = useContext(LoggedIn);

  // manejo del local storage para guardar localmente la info para continuar sesiones al cerrar un tab
  const [userIdLocalStorage, setUserIdLocalStorage] = useLocalStorage(
    localStorageId,
    ''
  );

  // extraer informacion del contexto
  const userId = loginContext?.[0].userId;
  // dispatch es el nombre de la funcion que maneja el cambio del state del contexto
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
    // hacer el login
    const userData = await authLogin(userIdentifier, userPassword);

    // si hay datos, gr8, si no, no se cambia el context
    if (userData) {
      dispatch &&
        dispatch({
          type: LoginActionTypes.Login,
          payload: { userId: userData.userId },
        });
      Router.push('/');
    }
  }

  // cada que cambia el token del usuario, almacenar el token en localstorage
  useEffect(() => {
    if (userId === userIdLocalStorage) return;

    setUserIdLocalStorage(userId || '');
  }, [userId]);

  return {
    userId: userIdLocalStorage,
    logout,
    login,
  };
}

/**
 * funcion que se llama automaticamente por el uselogincontext a traves del dispatch
 * @param state el estado actual del context
 * @param action el valor que indica lo que se quiere hacer
 */
function reducer(state: LoginState, action: LoginAction): LoginState {
  switch (action.type) {
    // si es login, nomas agregar / reemplazar el userid al estado
    case LoginActionTypes.Login:
      if (action.payload) {
        const userId = action.payload.userId;

        return { ...state, userId: userId };
      }
      return { ...state };
    // si es logour, quitar el userid y el estado
    case LoginActionTypes.Logout:
      return { userId: '' };
  }
}

function LoginContext({ children }: LoginContextProps) {
  const [userId] = useLocalStorage<string>(localStorageId);
  // use reducer es una alternativa a usestate
  // state => valor del id del usuario
  // dispatch => funcion que va a realizar el cambio
  const [state, dispatch] = useReducer(reducer, {
    userId: userId,
  });

  /* console.log(userId, state); */

  return <Provider value={[state, dispatch]}>{children}</Provider>;
}

export default LoginContext;
