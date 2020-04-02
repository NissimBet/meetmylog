import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { PersonalMeetings, GroupsList } from '../components/Profile';
import { withAuthSync, auth } from '../utils/authentication';
import nextCookie from 'next-cookies';
import Router from 'next/router';

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
  userData: {
    username: string;
    meetings: { name: string }[];
    groups: {
      leader: { name: string }[];
      member: { name: string }[];
    };
  };
}

const ProfilePage: NextPage<ProfilePageProps> = props => {
  const {
    userData: { groups, meetings, username },
  } = props;
  return (
    <React.Fragment>
      <Head>
        <title>Tu Perfil | {username}</title>
      </Head>
      <div>
        <h1>{username}</h1>

        <Container>
          <MeetingsList meetings={meetings} />

          {groups?.member && (
            <div>
              <h1>Your are a member of</h1>

              <GroupsList groups={groups.member} columns={2} />
            </div>
          )}
          {groups?.leader && (
            <div>
              <h1>Your are a leader of</h1>

              <GroupsList groups={groups.leader} />
            </div>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { token } = nextCookie(ctx);

  if (!token) {
    if (typeof window === 'undefined') {
      ctx.res?.writeHead(302, { Location: '/login' });
      ctx.res?.end();
    } else {
      Router.push('/login');
    }
  }

  const userData = {
    username: 'John Doe',
    meetings: [
      { name: 'meeting 1' },
      { name: 'meeting 2' },
      { name: 'meeting 3' },
      { name: 'meeting 4' },
      { name: 'meeting 5' },
      { name: 'meeting 6' },
      { name: 'meeting 7' },
      { name: 'meeting 8' },
      { name: 'meeting 9' },
    ],
    groups: {
      leader: [
        { name: 'Group 1' },
        { name: 'Group 4' },
        { name: 'Group 7' },
        { name: 'Group 8' },
      ],
      member: [
        { name: 'Group 2' },
        { name: 'Group 3' },
        { name: 'Group 5' },
        { name: 'Group 6' },
      ],
    },
  };

  return { props: { userData } };
};

export default ProfilePage;
