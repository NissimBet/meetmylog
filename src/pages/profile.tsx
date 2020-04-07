import React, { useEffect, useState } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import nextCookie from 'next-cookies';
import cookies from 'js-cookie';
import Router from 'next/router';
import axios from 'axios';

import { PersonalMeetings, GroupsList } from '../components/Profile';
import { withAuthSync, auth } from '../utils/authentication';
import { BACKEND_URI } from '../utils/config';
import { useLoginContext } from '../hooks/login';

const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 3fr 2fr;
  gap: 40px;
`;

const MeetingsList = styled(PersonalMeetings)`
  grid-column: 1 / span 2;
`;

interface ProfilePageProps {
  token: string;
}

interface UserData {
  _id: string;
  email: string;
  username: string;
  name: string;
  userId: string;
}
interface MeetingData {
  _id: string;
  meetingId: string;
  meetingName: string;
  startedDate: string;
  finishedDate: string;
  ongoing: boolean;
  creator: string;
  chat: string[];
  members: string[];
}

interface GroupData {
  _id: string;
  groupId: string;
  name: string;
  creator: string;
  members: string[];
  meetings: string[];
}

const ProfilePage: NextPage<ProfilePageProps> = props => {
  const token = cookies.get('token');

  const { userId } = useLoginContext();

  const [data, setData] = useState<UserData>();
  const [meetings, setMeetings] = useState<MeetingData[]>();
  const [groups, setGroups] = useState<GroupData[]>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URI}/user/get/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(data => {
        setData(data.data);
      })
      .catch(err => console.log(err));
    axios
      .get(`${BACKEND_URI}/meeting/get?id=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(data => {
        setMeetings(data.data);
      })
      .catch(err => console.log(err));
    axios
      .get(`${BACKEND_URI}/group/get?id=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(data => {
        setGroups(data.data);
      })
      .catch(err => console.log(err));
  }, []);

  console.log('data', data);
  console.log('meetings', meetings);
  console.log('groups', groups);
  return (
    <React.Fragment>
      <Head>
        <title>{data ? `Tu Perfil | ${data.name}` : 'Cargando'}</title>
      </Head>
      {data ? (
        <div>
          <h1>{data.username}</h1>

          <Container>
            {meetings && <MeetingsList meetings={meetings} />}

            {groups && (
              <div>
                <h1>Your are a member of</h1>

                <GroupsList
                  groups={groups.filter(group => group.creator !== data._id)}
                  columns={2}
                />
              </div>
            )}
            {groups && (
              <div>
                <h1>Your are a leader of</h1>

                <GroupsList
                  groups={groups.filter(group => group.creator === data._id)}
                />
              </div>
            )}
          </Container>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </React.Fragment>
  );
};

export default withAuthSync(ProfilePage);
