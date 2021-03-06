import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Formik, validateYupSchema } from 'formik';
import styled from 'styled-components';
import Button from '../components/Button';
import { Error, Label, Input } from '../components/Form';

import { object, string } from 'yup';
import axios from 'axios';
import { BACKEND_URI } from '../utils/config';
import Router from 'next/router';

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${Error} {
    align-self: flex-end;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0;
  padding: 10px 15px;

  border: 1px solid ${({ theme }) => theme.colors.container.primary};
  border-radius: 15px;

  background-color: ${({ theme }) => theme.colors.container.contrast};

  ${Label} {
    flex: 2;
  }

  ${Input} {
    flex: 3;
    border-radius: 10px;
  }
`;

// validacion por medio de yup
const FormValidation = object().shape({
  username: string()
    /* .min(6, 'Su nombre de usuario debe ser al menos 6 caracteres de largo') */
    .required('Please enter your username'),
  email: string()
    .email('Please enter a valid email address like email@site.com')
    .required('Please enter your email address'),
  password: string()
    .required('Please enter your password')
    .matches(
      /[a-zA-Z0-9!$%$@]*/,
      'The password can only contain numbers, letters or special characters'
    )
    .min(8, 'The password must be at least 8 characters long'),
  confirmPassword: string()
    .required('Please reenter your password')
    .test('passwords-match', 'Passwords do not match', function(val) {
      return this.parent.password === val;
    }),
});

const PaginaRegistro: NextPage = () => {
  // state para mostrar el error que el servidor manda, si se mando alguno
  const [serverError, setServerError] = useState('');
  return (
    <React.Fragment>
      <Head>
        <title>Register</title>
      </Head>
      <div
        style={{
          maxWidth: '800px',
          margin: 'auto',
          // border: '1px solid #ccc',
          padding: '40px',
        }}
      >
        {/* Manejador de formularios, se encarga de muchas cosas que hacen todo mas tedioso */}
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true);
            setServerError('');
            // extraer datos
            const { email, password, username } = values;
            // realizar el request del registro
            axios
              .post(`${BACKEND_URI}/user/register`, {
                username,
                email,
                password,
                name: username,
              })
              .then(_ => {
                // si el registro fue exitoso, ir al login
                Router.push('/login');
                actions.setSubmitting(false);
              })
              // error generico
              // se puede revisar el codigo de error que axios recibe
              .catch(data => {
                setServerError('Username or email in use');
                actions.setSubmitting(false);
              });
          }}
          // esquema de validacion que se va a seguir
          validationSchema={FormValidation}
          // validar cuando se pierde el focus en un input
          // blur => perdida de focus en un elemento
          validateOnBlur
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
            touched,
            handleBlur,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <FormContent>
                <InputContainer>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    autoFocus
                  />
                </InputContainer>

                {errors.username && touched.username && (
                  <Error>{errors.username}</Error>
                )}

                <InputContainer>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </InputContainer>

                {errors.email && touched.email && <Error>{errors.email}</Error>}

                <InputContainer>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </InputContainer>

                {errors.password && touched.password && (
                  <Error>{errors.password}</Error>
                )}

                <InputContainer>
                  <Label htmlFor="confirmPassword">Confirm your password</Label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                  />
                </InputContainer>

                {errors.confirmPassword && touched.confirmPassword && (
                  <Error>{errors.confirmPassword}</Error>
                )}
              </FormContent>

              {serverError && (
                <Error style={{ textAlign: 'center' }}>{serverError}</Error>
              )}

              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default PaginaRegistro;
