import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Formik, Form } from 'formik';
import Button from '../../components/Button';
import styled from 'styled-components';

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

const CreateMeetingPage: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Crea una reunion</title>
      </Head>
      <Formik
        initialValues={{
          name: '',
          share_method: '',
          user_names: [],
          share_link: '',
          group_name: '',
        }}
        onSubmit={values => console.log(values)}
      >
        {formikBag => (
          <Form
            style={{
              maxWidth: '800px',
              margin: 'auto',
              border: '1px solid #ccc',
              padding: '40px',
            }}
          >
            <h1>Crea tu reunion</h1>
            <FormContent>
              <InputContainer>
                <Label htmlFor="meeting_name">Nombre de la reunion</Label>
                <Input
                  type="text"
                  name="name"
                  id="meeting_name"
                  onChange={formikBag.handleChange}
                  onBlur={formikBag.handleBlur}
                />
              </InputContainer>
              <InputContainer>
                <select
                  name="share_method"
                  id="share_method"
                  onChange={formikBag.handleChange}
                  onBlur={formikBag.handleBlur}
                >
                  <option value="">
                    Seleccione una forma de compartir la reunion
                  </option>
                  <option value="group_name">Equipo existente</option>
                  <option value="share_link">
                    Generar link para compartir
                  </option>
                  <option value="user_names">Nombres de usuario</option>
                </select>
              </InputContainer>

              {formikBag.values.share_method === 'group_name' && (
                <InputContainer>
                  <div>Ingrese el nombre del equipo de trabajo</div>
                </InputContainer>
              )}
              {formikBag.values.share_method === 'share_link' && (
                <InputContainer>
                  <div>Este es el link de la reunion</div>
                </InputContainer>
              )}
              {formikBag.values.share_method === 'user_names' && (
                <InputContainer>
                  <div>Ingrese el nombre de los integrantes</div>
                </InputContainer>
              )}
            </FormContent>

            <Button type="submit">Crear</Button>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default CreateMeetingPage;
