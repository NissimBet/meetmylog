import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';


import axios from 'axios';

import { PersonalMeetings, GroupsList } from '../components/Profile';
import { withAuthSync } from '../utils/authentication';
import { BACKEND_URI } from '../utils/config';
import { useLoginContext } from '../hooks/login';
import { partitionArray } from '../utils/util';

const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: repeat(5, 1fr);
  gap: 100px 40px;
`;

const Username = styled.h1`
  margin: 20px 0;

  letter-spacing: 2px;
`;

const SectionTitle = styled.h2`
  margin-top: 10px;
  margin-bottom: 30px;

  letter-spacing: 2px;
`;

const OngoingMeetings = styled.div`
  border: 1px solid #ccc;
  grid-column: 1 / span 2;
`;

const EndedMeetings = styled.div`
  border: 1px solid #ccc;
  grid-column: 3 / span 3;
`;

const MemberGroups = styled.div`
  border: 1px solid #ccc;
  grid-column: 1 / span 3;
`;

const LeaderGroups = styled.div`
  border: 1px solid #ccc;
  grid-column: 4 / span 2;
`;

interface ProfilePageProps {
  token: string;
}

const ProfilePage: NextPage<ProfilePageProps> = props => {
  // token del usuario recibido del componente de autorizacion
  const token = props.token || '';
  console.log(token);
  // tomar el id del usuario que esta iniciado sesion, del context
  const { userId } = useLoginContext();

  // estado para cada uno de los queries
  const [data, setData] = useState<UserData>();
  const [meetings, setMeetings] = useState<MeetingData[]>();
  const [groups, setGroups] = useState<GroupData[]>();

  useEffect(() => {
    // sacar datos del usuario
    axios
      .get(`${BACKEND_URI}/user/get`, {
        params:{
          userId: userId
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(data => {
        setData(data.data);
      })
      .catch(err => console.log(err));

    // sacar datos del meeting
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

    // buscar grupos del usuario
    axios
      .get(`${BACKEND_URI}/group/get?id=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(data => {
        setGroups(data.data);
        console.log(data.data);
      })
      .catch(err => console.log(err));
  }, []);

  const [ongoingMeetings, finishedMeetings] = partitionArray(
    meetings || [],
    meeting => meeting.ongoing
  );
  console.log(groups);
  const [leaderGroups, memberGroups] = partitionArray(
    groups || [],
    //@ts-ignore
    group => group.creator === data._id 
  );

  return (
    <React.Fragment>
      <Head>
        <title>{data ? `Tu Perfil | ${data.name}` : 'Cargando'}</title>
      </Head>
      {data ? (
        <div>
          <Username>{data.username}</Username>

          <Container>
            {meetings && (
              <OngoingMeetings>
                <SectionTitle>Ongoing Meetings</SectionTitle>
                <PersonalMeetings cols={2} meetings={ongoingMeetings} />
              </OngoingMeetings>
            )}

            {meetings && (
              <EndedMeetings>
                <SectionTitle>Archived Meetings</SectionTitle>
                <PersonalMeetings cols={3} meetings={finishedMeetings} />
              </EndedMeetings>
            )}

            {groups && (
              <MemberGroups>
                <SectionTitle>Your are a member of</SectionTitle>

                <GroupsList groups={memberGroups} columns={3} />
              </MemberGroups>
            )}

            {groups && (
              <LeaderGroups>
                <SectionTitle>Your are a leader of</SectionTitle>
                <GroupsList groups={leaderGroups} columns={3} />
              </LeaderGroups>
            )}
          </Container>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </React.Fragment>
  );
};

// proteger por medio del componente de autenticacion a la pagina
export default withAuthSync(ProfilePage);
