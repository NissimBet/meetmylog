import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import { Formik, Form, setNestedObjectValues } from 'formik';
import styled from 'styled-components';
import axios from 'axios';
import { object, string, array } from 'yup';
import { FaPlus } from 'react-icons/fa';

import Button from '../../components/Button';
import {
  Error,
  Label,
  Input,
  Select,
  SelectComponent,
} from '../../components/Form';

import { withAuthSync } from '../../utils/authentication';
import { BACKEND_URI } from '../../utils/config';
import { useLoginContext } from '../../hooks/login';
import GroupsList from '../../components/Meeting/Create/GroupsList';
import UsersList from '../../components/Meeting/Create/UsersList';

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  /* 
    Se pueden hacer referencias a otros elementos de STYLED-COMPONENT, 
    no a componentes react de esta forma si se quiere modificar un componente de react es styled(Comp)
  */

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
const InputContainer2 = styled.div`
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
    flex: 2.73;
  }
`;

const MiembrosContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0;

  ${Label} {
    flex: 2;
  }
`;

const SelectionContainer = styled.div`
  width: 100%;
`;

// esquema de validacion del formulario de creacion de reuniones
const validation = object().shape({
  teamName: string().required('Favor de seleccionar un nombre para el equipo'),
  memberEmail: string().email('Por favor ingrese un correo válido'),
  members: array().notRequired(),
});

function onKeyDown(keyEvent: {
  charCode: any;
  keyCode: any;
  preventDefault: () => void;
}) {
  if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
    keyEvent.preventDefault();
  }
}

const CreateTeamPage: NextPage<{ token: string }> = props => {
  const { token } = props;
  // tomar el id del usuario por medio del context
  const { userId } = useLoginContext();
  // estado para los miembros unicos de todos los grupos
  return (
    <React.Fragment>
      <Head>
        <title>Crea un Equipo</title>
      </Head>
      <Formik
        initialValues={{
          teamName: '',
          memberEmail: '',
          addUser: false,
          members: [],
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          console.log(values.addUser);
          if (values.addUser) {
            console.log(values.memberEmail);
            axios
              .get(`${BACKEND_URI}/user/get`, {
                params: {
                  email: values.memberEmail,
                },
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then(response => {
                // si todo bien, ir al meeting
                if (
                  !values.members.some(e => e._id == response.data._id) &&
                  response.data.userId != userId
                ) {
                  values.members.push(response.data);
                  actions.setFieldValue('memberEmail', '');
                  actions.setSubmitting(false);
                } else {
                  actions.setFieldError(
                    'memberEmail',
                    'Ese usuario ya esta en el equipo'
                  );
                  actions.setSubmitting(false);
                }
              })
              .catch(err => {
                actions.setFieldError('memberEmail', 'Ese usuario no existe');
                actions.setSubmitting(false);

                // error, nada :c
              });
          } else {
            // hacer el request
            axios
              .post(
                `${BACKEND_URI}/group/new`,
                {
                  creator: userId,
                  name: values.teamName,
                  members: values.members,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then(response => {
                Router.push(`/team/${response.data.groupId}`);
                // si todo bien, ir al meeting
                actions.setSubmitting(false);
              })
              .catch(err => {
                // error, nada :c
                console.log(err);
                actions.setSubmitting(false);
              });
          }
        }}
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
            onKeyDown={onKeyDown}
          >
            <h1>Crea tu Equipo</h1>
            <FormContent>
              <InputContainer>
                <Label htmlFor="meetingName">Nombre del equipo</Label>
                <Input
                  type="text"
                  name="teamName"
                  id="teamName"
                  onChange={formikBag.handleChange}
                  onBlur={formikBag.handleBlur}
                  autoFocus
                />
              </InputContainer>

              {formikBag?.errors.teamName && formikBag?.touched.teamName && (
                <Error>{formikBag.errors.teamName}</Error>
              )}

              <InputContainer2>
                <Label htmlFor="add_member">Agrega miembros al equipo</Label>
                <Input
                  type="text"
                  name="memberEmail"
                  id="memberEmail"
                  value={formikBag.values.memberEmail}
                  onChange={formikBag.handleChange}
                  onBlur={formikBag.handleBlur}
                />
                <Button
                  type="submit"
                  disabled={formikBag.isSubmitting}
                  onClick={() => formikBag.setFieldValue('addUser', true)}
                  variant="round"
                >
                  <FaPlus
                    style={{
                      position: 'relative',
                      left: '50%',
                      margin: '-8px 0 0 -8px',
                    }}
                  />
                </Button>
              </InputContainer2>
              {formikBag?.errors.memberEmail && (
                <Error>{formikBag.errors.memberEmail}</Error>
              )}
              <MiembrosContainer>
                <Label htmlFor="current_member">Miembros:</Label>
                <UsersList
                  variant="options"
                  selected={formikBag.values.members}
                  members={formikBag.values.members}
                  // funcion que agrega a un miembro a la lista
                  handleSelect={id => {
                    console.log(id);
                    // indice del miembro en el arreglo de todos
                    const index = formikBag.values.members.findIndex(
                      obj => obj.userId === id
                    );
                    const newArr = [
                      ...formikBag.values.members.slice(0, index),
                      ...formikBag.values.members.slice(index + 1),
                    ];
                    console.log(index);
                    // crear un arreglo con los valores anteriores
                    // set el valor del field
                    formikBag.setFieldValue('members', newArr, true);
                  }}
                />
              </MiembrosContainer>
            </FormContent>
            <Button
              type="submit"
              disabled={formikBag.isSubmitting}
              onClick={() => formikBag.setFieldValue('addUser', false)}
            >
              Crear
            </Button>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default withAuthSync(CreateTeamPage);
