import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import MeetingPage from '../../../components/Meeting';
import { withAuthSync } from '../../../utils/authentication';
import axios, { AxiosError } from 'axios';

import io from 'socket.io-client';

import { BACKEND_URI } from '../../../utils/config';
import { useRouter } from 'next/router';

const Meeting: NextPage<{ token: string }> = props => {
  const { token } = props;
  const [meetingData, setMeetingData] = useState<MeetingData>();
  const [chat, setChat] = useState<Chat[]>();
  const [socket, setSocket] = useState<SocketIOClient.Socket>(null);

  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${BACKEND_URI}/meeting/get/${router.query.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(data => {
        setMeetingData(data.data);
        setChat([...data.data.chat]);
      })
      .catch((err: AxiosError) => {
        if (err.response.status === 403) router.replace('/404');
        else if (err.response.status === 401) router.replace('/login');
      });
  }, []);

  useEffect(() => {
    if (meetingData) {
      setSocket(io(`${BACKEND_URI}`));
    }

    return () => {
      socket?.disconnect();
    };
  }, [meetingData]);

  if (socket && meetingData) {
    socket.on(`message`, (data: Chat) => {
      setChat([...chat, data]);
      console.log(data);
    });
    socket.on('connect', () => {
      console.log('connection');
      socket.emit(
        'join-room',
        `meeting-${meetingData.meetingId.substring(
          meetingData.meetingId.length - 5
        )}`
      );
    });
  }

  return (
    <React.Fragment>
      <Head>
        <title>{meetingData ? meetingData.meetingName : 'Cargando'}</title>
      </Head>
      {meetingData && chat ? (
        <MeetingPage
          {...meetingData}
          chat={chat}
          token={token}
          onChatSubmit={newChat => {
            if (socket) {
              socket.emit(`message`, newChat);
            }
            setChat([...chat, newChat]);
          }}
        />
      ) : (
        <h1>Cargando ...</h1>
      )}
    </React.Fragment>
  );
};

export default withAuthSync(Meeting);
