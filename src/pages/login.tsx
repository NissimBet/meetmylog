import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { NextPage } from 'next';
import { object, string } from 'yup';
import { Formik } from 'formik';
import Button from '../components/Button';
import { Error, Label, Input } from './../components/Form';
import { useLoginContext } from '../hooks/login';

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

  ${Label} {
    flex: 2;
  }

  ${Input} {
    flex: 3;
  }
`;

const FormValidation = object().shape({
  username: string()
    .min(6, 'Su nombre de usuario debe ser al menos 6 caracteres de largo')
    .required('Por favor ingrese su nombre de usuario'),
  password: string()
    .required('Favor de ingresar su contraseña')
    .matches(/[a-zA-Z0-9]*/, 'Solo debe contener numeros y letras')
    .min(8, 'La contraseña debe ser al menos 8 caracteres largo'),
});

const LoginPage: NextPage = () => {
  const { login } = useLoginContext();
  return (
    <React.Fragment>
      <Head>
        <title>Inicia Sesión</title>
      </Head>
      <div
        style={{
          maxWidth: '800px',
          margin: 'auto',
          border: '1px solid #ccc',
          padding: '40px',
        }}
      >
        <h1>Inicia Sesión</h1>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          onSubmit={values => login(values.username, values.password)}
          validationSchema={FormValidation}
          validateOnBlur
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
            touched,
            handleBlur,
          }) => (
            <form onSubmit={handleSubmit}>
              <FormContent>
                <InputContainer>
                  <Label htmlFor="username">Nombre de Usuario</Label>
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
                  <Label htmlFor="password">Contraseña</Label>
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
              </FormContent>

              <Button type="submit">Enviar</Button>
            </form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default LoginPage;
