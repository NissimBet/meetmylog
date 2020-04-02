import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import Router from 'next/router';

import { NextPageContext, NextPage } from 'next';
import { useEffect } from 'react';

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

interface UserLogin {
  email: string;
  password: string;
}

async function executeLoginRequest(credentials: UserLogin) {
  /**
   * Do Login magic
   */
  const response = true;

  return response; // JWT
}

export const login = async (email: string, password: string) => {
  // ask for login to server
  const loginStatus = await executeLoginRequest({ email, password });

  /* const loginStatus = await fetch(`${BACKEND_ROOT_URL}/login`, {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }); */

  //if (loginStatus.status === 201) {
  if (loginStatus) {
    cookie.set('token', email);
    Router.push('/');
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

    console.log(token);
    if (token) {
      // do token validation
    } else {
      console.log('Not logged in');
      redirect(ctx);
    }

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));
    return { ...componentProps, token };
  };

  return Wrapper;
};
