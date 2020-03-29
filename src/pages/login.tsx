import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { NextPage } from 'next';
import { object, string } from 'yup';
import { Formik } from 'formik';
import Button from '../components/Button';

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0;
`;

const Label = styled.label`
  flex: 1;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  padding: 10px 15px;

  font-size: 1em;
  flex: 2;
`;
const Error = styled.div`
  align-self: flex-end;
  color: #aa3132;
  border: 1px solid #cc8888;
  background: #eecccc;
  padding: 5px 10px;
  margin-bottom: 5px;
  border-radius: 10px;
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
          onSubmit={values => console.log(values)}
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