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
  const [message, setNewMessage] = useState<Chat>(null);

  const router = useRouter();

  // buscar los datos del meeting al montarse el componente
  useEffect(() => {
    axios
      .get(`${BACKEND_URI}/meeting/get/${router.query.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        // set los datos del meeting
        setMeetingData(data);
        // separar los datos del chat, que caambian mas seguido
        setChat([...data.chat]);

        setSocket(io(`${BACKEND_URI}`));
      })
      .catch((err: AxiosError) => {
        // dependiendo del error, ir al login o mandar 404
        if (err.response.status === 403) router.replace('/404');
        else if (err.response.status === 401) router.replace('/login');
      });

    return () => {
      socket?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit(
        'join-room',
        `meeting-${meetingData.meetingId.substring(
          meetingData.meetingId.length - 5
        )}`
      );

      socket.on(`message`, (data: Chat) => {
        // console.table(chat);
        setNewMessage(data);
        // console.table(chat);
        // console.log(data);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (message) {
      setChat([...chat, message]);
    }
  }, [message]);

  // esto deberia ponerse en el useeffect arribita ^ :b
  // cuando este el socket definido, y los datos del meeting,
  /* if (socket && meetingData) {
    // agregarle listeners al socket, cuando se reciba un mensaje del chat, agregarlo (por eso se hace un state diferente)
    socket.on(`message`, (data: Chat) => {
      setChat([...chat, data]);
      console.log(data);
    });

    // emitir un mensaje para con la info del room al cual conectarse
    socket.emit(
      'join-room',
      `meeting-${meetingData.meetingId.substring(
        meetingData.meetingId.length - 5
      )}`
    );
  }
 */
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
            // cuando se le da enter, al chat, emitir el mensaje al socket / server
            if (socket) {
              socket.emit(`message`, newChat);
            }
            // agregar el mensaje al chat
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
