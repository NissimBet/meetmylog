import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import Router from 'next/router';
import axios from 'axios';

import { NextPageContext, NextPage } from 'next';
import { useEffect } from 'react';
import { BACKEND_URI } from './config';

export const auth = (ctx: NextPageContext) => {
  const { token } = nextCookie(ctx);

  if (!token) {
    redirect(ctx);
  }

  return token;
};

export function getAuthToken() {
  return cookie.get('token');
}

function redirect(ctx: NextPageContext) {
  if (typeof window === 'undefined') {
    ctx.res?.writeHead(302, { Location: '/login' });
    ctx.res?.end();
  } else {
    Router.push('/login');
  }
}

export const logout = () => {
  cookie.remove('token');
  window.localStorage.setItem('logout', Date.now().toString());
  /* Router.push('/login'); */
};

export const login = async (email: string, password: string) => {
  // ask for login to server
  try {
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

    if (loginData.status === 200) {
      cookie.set('token', loginData.data.token);
      return loginData.data;
    }
    return null;
  } catch (error) {
    throw Error(error);
  }
};

export const withAuthSync = (WrappedComponent: NextPage) => {
  const Wrapper: NextPage = props => {
    const syncLogout = (event: StorageEvent) => {
      if (event.key === 'logout') {
        Router.push('/login');
      }
    };

    useEffect(() => {
      window.addEventListener('storage', syncLogout);
      return () => {
        window.removeEventListener('storage', syncLogout);
        window.localStorage.removeItem('logout');
      };
    }, []);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async ctx => {
    const token = auth(ctx);

    if (token) {
      try {
        await axios.get(`${BACKEND_URI}/user/token`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        redirect(ctx);
      }
    } else {
      redirect(ctx);
    }

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));
    return { ...componentProps, token };
  };

  return Wrapper;
};
