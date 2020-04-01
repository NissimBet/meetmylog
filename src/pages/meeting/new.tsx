import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Formik, Form } from 'formik';
import Button from '../../components/Button';
import styled from 'styled-components';
import {
  Error,
  Label,
  Input,
  Select,
  SelectComponent,
} from '../../components/Form';
import { object, string, array } from 'yup';

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

  ${Input}, ${Select} {
    flex: 3;
  }
`;

const validation = object().shape({
  name: string().required('Favor de seleccionar un nombre para la reunión'),
  share_method: string()
    .oneOf(
      ['group_name', 'share_link', 'user_names'],
      'Favor seleccione una forma de compartir la reunión'
    )
    .required('Favor seleccione una forma de compartir la reunión'),
  user_names: array().notRequired(),
  share_link: string().notRequired(),
  group_name: string().notRequired(),
});

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
        validationSchema={validation}
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
                  autoFocus
                />
              </InputContainer>

              {formikBag?.errors.name && formikBag?.touched.name && (
                <Error>{formikBag.errors.name}</Error>
              )}

              <InputContainer>
                <Label htmlFor="share_method">
                  Seleccione una forma de compartir la reunion
                </Label>

                <SelectComponent
                  handleBlur={formikBag.handleBlur}
                  handleChange={formikBag.handleChange}
                  id="share_method"
                  name="share_method"
                  values={[
                    { label: '', value: '' },
                    { label: 'Equipo existente', value: 'group_name' },
                    {
                      label: 'Generar link para compartir',
                      value: 'share_link',
                    },
                    { label: 'Nombres de usuario', value: 'user_names' },
                  ]}
                />
              </InputContainer>

              {formikBag?.errors.share_method &&
                formikBag?.touched.share_method && (
                  <Error>{formikBag.errors.share_method}</Error>
                )}

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