import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import { Formik, Form } from 'formik';
import styled from 'styled-components';
import axios from 'axios';
import { object, string, array } from 'yup';

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

  ${Input}, ${Select} {
    flex: 3;
  }
`;

const SelectionContainer = styled.div`
  width: 100%;
`;

// esquema de validacion del formulario de creacion de reuniones
const validation = object().shape({
  meetingName: string().required(
    'Favor de seleccionar un nombre para la reunión'
  ),
  share_method: string()
    .oneOf(
      ['groupId', 'share_link', 'members'],
      'Favor seleccione una forma de compartir la reunión'
    )
    .required('Favor seleccione una forma de compartir la reunión'),
  members: array().notRequired(),
  share_link: string().notRequired(),
  groupId: string().notRequired(),
});

const CreateMeetingPage: NextPage<{ token: string }> = props => {
  // tomar el token del componente de validacion
  const { token } = props;
  // tomar el id del usuario por medio del context
  const { userId } = useLoginContext();
  // state para guardar los datos de los grupos del usuario
  const [groups, setGroups] = useState<GroupData[]>([]);
  // estado para los miembros unicos de todos los grupos
  const [uniqueMembers, setUniqueMembers] = useState<
    Omit<UserData, 'email'>[]
  >();

  // use effect cuando el componente se carga
  useEffect(() => {
    // buscar los datos de los grupos
    axios
      .get(`${BACKEND_URI}/group/get?id=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        // guardar los grupos
        setGroups(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  // useEffect que se ejecuta cuando groups cambia
  useEffect(() => {
    // arreglo de los miembros unicos
    const unique: Omit<UserData, 'email'>[] = [];

    groups
      // crear un arreglo solo con los miembros
      .flatMap(group => group.members)
      // iterar por cada miembro para encontrar repeticiones y agregarlo al arreglo de unicos
      .forEach(member => {
        // si se encuentra un miembro de
        const index = unique.findIndex(
          searchMember => searchMember.userId === member.userId
        );
        // si no se encuentra agregar al arreglo de miembros
        if (index === -1) {
          unique.push({
            _id: member._id,
            name: member.name,
            userId: member.userId,
            username: member.username,
          });
        }
      });
    setUniqueMembers(unique);
  }, [groups]);

  return (
    <React.Fragment>
      <Head>
        <title>Crea una reunion</title>
      </Head>
      <Formik
        initialValues={{
          meetingName: '',
          share_method: '',
          members: [],
          share_link: '',
          groupId: '',
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          // crear el arreglo de miembros para mandar al api
          const meetingMembers: string[] = [];
          if (values.share_method === 'groupId') {
            // si el metodo es por grupo, extraer los id para enviarlos
            meetingMembers.push(
              ...groups
                // filtrar los miembros unicos
                .find(val => val.groupId === values.groupId)
                // extraer sus id
                .members.flatMap(user => user.userId)
            );
          } else if (values.share_method === 'members') {
            // members solo tiene los id de los miembros
            meetingMembers.push(...values.members);
          }

          // hacer el request
          axios
            .post(
              `${BACKEND_URI}/meeting/new`,
              {
                creator: userId,
                members: meetingMembers,
                meetingName: values.meetingName,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then(response => {
              // si todo bien, ir al meeting
              Router.push(`/meeting/ongoing/${response.data.meetingId}`);
              actions.setSubmitting(false);
            })
            .catch(err => {
              // error, nada :c
              console.log(err);
              actions.setSubmitting(false);
            });
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
          >
            <h1>Crea tu reunion</h1>
            <FormContent>
              <InputContainer>
                <Label htmlFor="meetingName">Nombre de la reunion</Label>
                <Input
                  type="text"
                  name="meetingName"
                  id="meetingName"
                  onChange={formikBag.handleChange}
                  onBlur={formikBag.handleBlur}
                  autoFocus
                />
              </InputContainer>

              {formikBag?.errors.meetingName &&
                formikBag?.touched.meetingName && (
                  <Error>{formikBag.errors.meetingName}</Error>
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
                    { label: 'Equipo existente', value: 'groupId' },
                    {
                      label: 'Generar link para compartir',
                      value: 'share_link',
                    },
                    { label: 'Nombres de usuario', value: 'members' },
                  ]}
                />
              </InputContainer>

              {formikBag?.errors.share_method &&
                formikBag?.touched.share_method && (
                  <Error>{formikBag.errors.share_method}</Error>
                )}

              {formikBag.values.share_method === 'groupId' && (
                <SelectionContainer>
                  <div>Ingrese el nombre del equipo de trabajo</div>
                  <GroupsList
                    selected={formikBag.values.groupId}
                    groups={groups}
                    handleSelect={id => {
                      formikBag.setFieldValue('groupId', id, true);
                    }}
                  />
                </SelectionContainer>
              )}
              {formikBag.values.share_method === 'share_link' && (
                <SelectionContainer>
                  <div>Este es el link de la reunion</div>
                </SelectionContainer>
              )}
              {formikBag.values.share_method === 'members' && (
                <SelectionContainer>
                  <div>Ingrese el nombre de usuario los integrantes</div>
                  <UsersList
                    selected={formikBag.values.members}
                    members={uniqueMembers}
                    // funcion que agrega a un miembro a la lista
                    handleSelect={id => {
                      // indice del miembro en el arreglo de todos
                      const index = formikBag.values.members.indexOf(id);
                      // crear un arreglo con los valores anteriores
                      const newArr = [...formikBag.values.members];
                      // si no se encontro, agregarlo, si si eliminarlo
                      if (index === -1) {
                        newArr.push(id);
                      } else {
                        newArr.splice(index, 1);
                      }
                      // set el valor del field
                      formikBag.setFieldValue('members', newArr, true);
                    }}
                  />
                </SelectionContainer>
              )}
            </FormContent>

            <Button type="submit" disabled={formikBag.isSubmitting}>
              Crear
            </Button>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

// proteger por medio del componente de autenticacion a la pagina
export default withAuthSync(CreateMeetingPage);
