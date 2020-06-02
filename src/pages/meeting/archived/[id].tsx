import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { BACKEND_URI } from '../../../utils/config';
import { useLoginContext } from '../../../hooks/login';
import { withAuthSync } from '../../../utils/authentication';
import { NextScript } from 'next/document';
import MeetingPage from '../../../components/Meeting/Archived';


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
    <React.Fragment>
      <Head>
        <title>{meetingData ? meetingData.meetingName : 'Cargando'}</title>
      </Head>
      {meetingData ? (
        <MeetingPage
          {...meetingData}
          chat={meetingData.chat}
          responsabilities={meetingData.responsabilities}
          token={token}
        />
      ) : (
        <h1>Loading ...</h1>
      )}
    </React.Fragment>
  );
};

export default withAuthSync(ArchivedMeetingPage);
