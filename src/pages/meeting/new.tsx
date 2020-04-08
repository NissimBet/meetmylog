import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Formik, Form } from 'formik';
import Button from '../../components/Button';
import styled from 'styled-components';
import axios from 'axios';
import {
  Error,
  Label,
  Input,
  Select,
  SelectComponent,
} from '../../components/Form';
import { object, string, array } from 'yup';
import { withAuthSync } from '../../utils/authentication';
import { BACKEND_URI } from '../../utils/config';
import { useLoginContext } from '../../hooks/login';

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
  meetingName: string().required(
    'Favor de seleccionar un nombre para la reunión'
  ),
  share_method: string()
    .oneOf(
      ['group_name', 'share_link', 'members'],
      'Favor seleccione una forma de compartir la reunión'
    )
    .required('Favor seleccione una forma de compartir la reunión'),
  members: array().notRequired(),
  share_link: string().notRequired(),
  group_name: string().notRequired(),
});

const CreateMeetingPage: NextPage<{ token: string }> = props => {
  const { token } = props;
  const { userId } = useLoginContext();
  const [groups, setGroups] = useState<GroupData[]>([]);
  const [uniqueMembers, setUniqueMembers] = useState<
    Omit<UserData, 'email'>[]
  >();

  useEffect(() => {
    axios
      .get(`${BACKEND_URI}/group/get?id=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setGroups(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const unique: Omit<UserData, 'email'>[] = [];
    groups
      .flatMap(group => group.members)
      .forEach(member => {
        const index = unique.findIndex(
          searchMember => searchMember.userId === member.userId
        );
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
                    { label: 'Equipo existente', value: 'group_name' },
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

              {formikBag.values.share_method === 'group_name' && (
                <InputContainer>
                  <div>Ingrese el nombre del equipo de trabajo</div>
                  <ul>
                    {groups.map(group => (
                      <li key={group._id}>
                        {group.name}
                        <ul>
                          {group?.members.map(member => (
                            <li key={member._id}>{member.name}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </InputContainer>
              )}
              {formikBag.values.share_method === 'share_link' && (
                <InputContainer>
                  <div>Este es el link de la reunion</div>
                </InputContainer>
              )}
              {formikBag.values.share_method === 'members' && (
                <InputContainer>
                  <div>Ingrese el nombre de usuario los integrantes</div>
                  <ul>
                    {uniqueMembers.map(member => (
                      <li key={member.userId}>{member.name}</li>
                    ))}
                  </ul>
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

export default withAuthSync(CreateMeetingPage);
