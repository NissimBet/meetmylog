import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import Router from 'next/router';
import axios from 'axios';

import { NextPageContext, NextPage } from 'next';
import { useEffect } from 'react';
import { BACKEND_URI } from './config';

/**
 * Revisa que el token se encuentra en la pagina del cliente, 'esta parte es ssr'
 * @param ctx context, de una pagina de next (ssr)
 */
export const auth = (ctx: NextPageContext) => {
  const { token } = nextCookie(ctx);

  if (!token) {
    redirect(ctx);
  }

  return token;
};

/**
 * regresa el token que se encuentra guardado en las cookies
 */
export function getAuthToken() {
  return cookie.get('token');
}

/**
 * hace un redirect de la pagina
 * @param ctx context, de una pagina de next (ssr)
 */
function redirect(ctx: NextPageContext) {
  // window es solo del browser, si no esta, el ctx.res es undefined y se rompe
  if (typeof window === 'undefined') {
    ctx.res?.writeHead(302, { Location: '/login' });
    ctx.res?.end();
  } else {
    // hacer redirect del browser
    Router.push('/login');
  }
}

/**
 * quitar el token de sesion para autorizacion
 */
export const logout = () => {
  cookie.remove('token');
  window.localStorage.setItem('logout', Date.now().toString());
  /* Router.push('/login'); */
};

/**
 * intenta hacer login
 * @param email correo del usuario para iniciar sesion
 * @param password contrasena del usuario
 */
export const login = async (email: string, password: string) => {
  try {
    // hacer el request (POST)
    const loginData = await axios.post(
      `${BACKEND_URI}/user/login`,
      {
        email,
        password,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    // si el estado es 200, login successful,
    // set del token y regresar los datos de respuesta
    if (loginData.status === 200) {
      cookie.set('token', loginData.data.token);
      return loginData.data;
    }
    return null;
  } catch (error) {
    throw Error(error);
  }
};

/**
 * funcion que regresa un componente que encapsula otro,
 * no muestra nada, solo se encarga de asegurar que el token sea valido antes de mostrar un componente
 * Se usa para las paginas como perfil, meeting, etc que requieren de autenticacion y autorizacion
 * <Wrapper><MyComponente /></Wrapper>
 * @param WrappedComponent Componente que se quiere contener
 */
export const withAuthSync = (WrappedComponent: NextPage) => {
  // crea un componente wrapper, en si solo crea funcionalidad, no agrega estructuras de html
  // se le llama hoc (higher order component)
  const Wrapper: NextPage = props => {
    // funcion que maneja un evento de storage
    const syncLogout = (event: StorageEvent) => {
      if (event.key === 'logout') {
        Router.push('/login');
      }
    };

    // useEffect que se ejecuta cuando se cree el componente wrapper,
    useEffect(() => {
      // crear un event listener al window, para escuchar eventos de storage
      window.addEventListener('storage', syncLogout);
      return () => {
        // al destruirse el componente, quitar el listener y el item de logout que se agrego previamente
        window.removeEventListener('storage', syncLogout);
        window.localStorage.removeItem('logout');
      };
    }, []);

    // regresar el componente encapsulado
    return <WrappedComponent {...props} />;
  };

  // getInitialProps se llama en el servidor, esta revisando que el token sea correcto
  Wrapper.getInitialProps = async ctx => {
    const token = auth(ctx);

    // si esta el token
    if (token) {
      try {
        // validarlo
        await axios.get(`${BACKEND_URI}/user/token`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        redirect(ctx);
      }
    } else {
      redirect(ctx);
    }

    // conseguir los props del componente encapsulado para pasarselos otra vez
    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    // aqui se pasan los props con el token
    return { ...componentProps, token };
  };

  return Wrapper;
};
