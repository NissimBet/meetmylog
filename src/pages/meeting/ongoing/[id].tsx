import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import MeetingPage from '../../../components/Meeting';
import { withAuthSync } from '../../../utils/authentication';
import axios, { AxiosError } from 'axios';

import { useLoginContext } from './../../../hooks/login';
import { BACKEND_URI } from '../../../utils/config';
import { useRouter } from 'next/router';

const Meeting: NextPage<{ token: string }> = props => {
  const { token } = props;
  const [meetingData, setMeetingData] = useState<MeetingData>();
  const { userId } = useLoginContext();
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${BACKEND_URI}/meeting/get/${router.query.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(data => setMeetingData(data.data))
      .catch((err: AxiosError) => {
        if (err.response.status === 403) router.replace('/404');
        else if (err.response.status === 401) router.replace('/login');
      });
  }, []);

  console.log(meetingData);

  return (
    <React.Fragment>
      <Head>
        <title>{meetingData ? meetingData.meetingName : 'Cargando'}</title>
      </Head>
      {meetingData ? <MeetingPage /> : <h1>Cargando ...</h1>}
    </React.Fragment>
  );
};

export default withAuthSync(Meeting);
