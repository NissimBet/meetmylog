import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { BACKEND_URI } from '../../../utils/config';
import { useLoginContext } from '../../../hooks/login';
import { withAuthSync } from '../../../utils/authentication';
import { NextScript } from 'next/document';

interface ArchivedMeetingPageProps {
  token: string;
}

const ArchivedMeetingPage: NextPage<ArchivedMeetingPageProps> = props => {
  const token = props.token;
  const router = useRouter();

  const [meetingData, setMeetingData] = useState<MeetingData>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URI}/meeting/get/${router.query.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setMeetingData(data);
      })
      .catch(err => {
        if (err.response.status === 403) router.replace('/404');
        else if (err.response.status === 401) router.replace('/login');
        else if (err.response.status === 404) router.replace('/profile');
      });
  }, []);

  if (!meetingData) {
    return (
      <div>
        <Head>
          <title>Loading meeting</title>
        </Head>
        <div>Loading ...</div>
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>Archived Meeting | {meetingData?.meetingName}</title>
      </Head>

      <h1>{meetingData.meetingName}</h1>

      <div>
        <h2>aqui van los miembros</h2>
        <h2>aqui pueden ir highlights</h2>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h2>Aqui va el doc supongo</h2>
        </div>
        <div>
          <h2>Aqui va el chat o algo supongo</h2>
        </div>
      </div>
    </div>
  );
};

export default withAuthSync(ArchivedMeetingPage);
