import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import axios, { AxiosError } from 'axios';
import Router from 'next/router';
import styled from 'styled-components';
import { Formik, Form, setNestedObjectValues } from 'formik';
import { object, string, array } from 'yup';

import {
  Error,
  Label,
  Input,
  Select,
  SelectComponent,
} from '../../components/Form';

import Button from '../../components/Button';
import MeetingList from '../../components/Group/MeetingList';
import { FaPlus } from 'react-icons/fa';

import UsersListG from '../../components/Group/Userlist';
import UsersList from '../../components/Meeting/Create/UsersList';
import { withAuthSync } from '../../utils/authentication';
import { BACKEND_URI } from '../../utils/config';
import { useRouter } from 'next/router';
import { useLoginContext } from '../../hooks/login';
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ModalBody,
} from '../../components/Modal/Modal';

const MeetingLists = styled(MeetingList)``;
const UserLists = styled(UsersListG)``;
const ButtonYes = styled(Button)`
  margin-right: 10px;
  color: #fff;
  background-color: #00ff1b;
  &:hover {
    background-color: #00d316;
    color: #fff;
  }
`;
const ButtonNo = styled(Button)`
  margin-left: 10px;
  color: #fff;
  background-color: #ff0000;
  &:hover {
    background-color: #bf0000;
    color: #fff;
  }
`;
const Container = styled.div`
  display: grid;
  grid-template-rows: 50% 10% auto;
  grid-template-columns: auto 30%;
  gap: 100px 40px;
  ${MeetingLists} {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
  }

  ${UserLists} {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 3;
  }
`;

const TeamName = styled.h1`
  margin: 20px 0;
  text-align: center;
  letter-spacing: 2px;
`;
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

function onKeyDown(keyEvent: {
  charCode: any;
  keyCode: any;
  preventDefault: () => void;
}) {
  if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
    keyEvent.preventDefault();
  }
}

const validation = object().shape({
  memberEmail: string().email('Please enter a valid email'),
  members: array().notRequired(),
});

function removeMember(groupId: string, userId: string, token: string) {
  console.log(userId);
  axios
    .post(
      `${BACKEND_URI}/group/remove/member/${groupId}`,
      {
        member: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(data => {
      location.reload();
    })
    .catch(err => console.log(err));
}

const TeamPage: NextPage<{ token: string }> = props => {
  const { token } = props;
  const { userId } = useLoginContext();
  const [meetingData, setMeetingData] = useState<MeetingData[]>();
  const [groups, setGroups] = useState<GroupData>();
  const [disp, setDisp] = useState('none');
  const [dispR, setDispR] = useState('none');
  const [userR, setUserR] = useState<any>('');
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${BACKEND_URI}/group/get/${router.query.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(data => {
        setGroups(data.data);
      })
      .catch(err => console.log(err));

    axios
      .get(`${BACKEND_URI}/meeting/get/team?id=${router.query.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(data => {
        console.log(data.data);
        setMeetingData(data.data);
      })
      .catch(err => console.log(err));
  }, []);

  if (!groups) {
    return (
      <div>
        <Head>
          <title>Loading group</title>
        </Head>
        <div>Loading ...</div>
      </div>
    );
  }

  console.log(groups.members);
  return (
    <React.Fragment>
      <Head>
        <title>Team | {groups.name}</title>
      </Head>
      {groups ? (
        <div>
          <Modal display={disp}>
            <ModalContent>
              <ModalHeader
                title={'Add member'}
                color={'#428bca'}
                handleSelect={() => setDisp('none')}
              />
              <ModalBody>
                <Formik
                  initialValues={{
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
                            !values.members.some(
                              e => e._id == response.data._id
                            ) &&
                            !groups.members.some(
                              e => e._id == response.data._id
                            )
                          ) {
                            values.members.push(response.data);
                            actions.setFieldValue('memberEmail', '');
                            actions.setSubmitting(false);
                          } else {
                            actions.setFieldError(
                              'memberEmail',
                              'This user is already on this team '
                            );
                            actions.setSubmitting(false);
                          }
                        })
                        .catch(err => {
                          actions.setFieldError(
                            'memberEmail',
                            'User does not exist'
                          );
                          actions.setSubmitting(false);

                          // error, nada :c
                        });
                    } else {
                      // hacer el request
                      axios
                        .put(
                          `${BACKEND_URI}/group/add/member/${router.query.id}`,
                          {
                            members: values.members,
                          },
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        )
                        .then(response => {
                          // si todo bien, ir al meeting
                          actions.setSubmitting(false);
                          setDisp('none');
                          location.reload();
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
                      <FormContent>
                        <InputContainer2>
                          <Label htmlFor="add_member">
                            Add members to the team
                          </Label>
                          <Input
                            type="text"
                            name="memberEmail"
                            id="memberEmail"
                            value={formikBag.values.memberEmail}
                            onChange={formikBag.handleChange}
                            onBlur={formikBag.handleBlur}
                            autoFocus
                          />
                          <Button
                            type="submit"
                            disabled={formikBag.isSubmitting}
                            onClick={() =>
                              formikBag.setFieldValue('addUser', true)
                            }
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
                          <Label htmlFor="current_member">Members:</Label>
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
                        onClick={() =>
                          formikBag.setFieldValue('addUser', false)
                        }
                      >
                        Add
                      </Button>
                    </Form>
                  )}
                </Formik>
              </ModalBody>
            </ModalContent>
          </Modal>
          <Modal display={dispR}>
            <ModalContent>
              <ModalHeader
                title={
                  'Do you want to remove ' + userR.name + ' from the team?'
                }
                fontC={'#000'}
                color={'#ffffff'}
                handleSelect={() => setDispR('none')}
              />
              <ModalFooter color={'#ffffff'}>
                <ButtonYes
                  type="submit"
                  onClick={() => removeMember(groups.groupId, userR._id, token)}
                >
                  Yes
                </ButtonYes>
                <ButtonNo type="submit" onClick={() => setDispR('none')}>
                  No
                </ButtonNo>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <TeamName>{groups.name}</TeamName>
          {userId === groups.creator.userId ? (
            <div style={{ marginLeft: '80%' }}>
              <Button type="submit" onClick={() => setDisp('block')}>
                Add member
              </Button>
            </div>
          ) : (
            false
          )}
          <Container>
            <MeetingLists
              selected={''}
              meetings={meetingData}
              // funcion que agrega a un miembro a la lista
              handleSelect={meeting => {
                meeting.ongoing
                  ? Router.push(`/meeting/ongoing/${meeting.meetingId}`)
                  : Router.push(`/meeting/archived/${meeting.meetingId}`);
                // indice del miembro en el arreglo de todos
              }}
            />

            {userId === groups.creator.userId ? (
              <UsersListG
                variant="admin"
                selected={''}
                members={groups.members}
                creator={groups.creator.userId}
                // funcion que agrega a un miembro a la lista
                handleSelect={id => {
                  setUserR(id);
                  setDispR('block');
                  // indice del miembro en el arreglo de todos
                }}
              />
            ) : (
              <UsersListG
                variant="regular"
                selected={''}
                members={groups.members}
                creator={groups.creator.userId}
                // funcion que agrega a un miembro a la lista
                handleSelect={id => {
                  // indice del miembro en el arreglo de todos
                }}
              />
            )}
          </Container>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </React.Fragment>
  );
};

export default withAuthSync(TeamPage);
