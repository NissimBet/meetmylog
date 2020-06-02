import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import MeetingPage from '../../../components/Meeting';
import { withAuthSync } from '../../../utils/authentication';
import axios, { AxiosError } from 'axios';
import Router from 'next/router';
import io from 'socket.io-client';

import { BACKEND_URI } from '../../../utils/config';
import { useRouter } from 'next/router';

const Meeting: NextPage<{ token: string }> = props => {
  const { token } = props;
  const [meetingData, setMeetingData] = useState<MeetingData>();
  const [chat, setChat] = useState<Chat[]>();
  const [socket, setSocket] = useState<SocketIOClient.Socket>(null);
  const [message, setNewMessage] = useState<Chat>(null);
  const [responsabilites, setRespons] = useState<Responsabilities[]>();
  const [responsability, setNewRespons] = useState<Responsabilities>(null);
  const [responsabilityDel, setDelRespons] = useState<string>(null);



  const router = useRouter();

  // buscar los datos del meeting al montarse el componente
  useEffect(() => {
    axios
      .get(`${BACKEND_URI}/meeting/get/${router.query.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }: { data: MeetingData }) => {
        console.log(data);
        if (!data.ongoing) {
          router.replace('/profile');
        } else {
          // set los datos del meeting
          setMeetingData(data);
          // separar los datos del chat, que caambian mas seguido
          setChat([...data.chat]);
          setRespons([...data.responsabilities]);
          setSocket(io(`${BACKEND_URI}`));
        }
      })
      .catch((err: AxiosError) => {
        // dependiendo del error, ir al login o mandar 404
        if (err.response.status === 403) router.replace('/404');
        else if (err.response.status === 401) router.replace('/login');
        else if (err.response.status === 404) router.replace('/profile');
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
      socket.on(`command`, (data: Responsabilities) => {
        setNewRespons(data);
      });
      socket.on(`delete responsability`, (data: string) => {
        setDelRespons(data);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (message) {
      setChat([...chat, message]);
    }
  }, [message]);

  useEffect(() => {
    if (responsability) {
      setRespons([...responsabilites, responsability]);
    }
  }, [responsability]);

  useEffect(() => {
    if (responsabilityDel) {
      const index = responsabilites.findIndex(obj => obj._id === responsabilityDel);
      const newArr = [
        ...responsabilites.slice(0, index),
        ...responsabilites.slice(index + 1)
      ]
      setRespons(newArr);
    }
  }, [responsabilityDel]);

  const closeMeeting = async () => {
    return axios
      .put(
        `${BACKEND_URI}/meeting/close/${meetingData.meetingId}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then(_ => {
        setTimeout(() => Router.push('/profile'), 1000);
      });
  };
  console.log(chat);
  console.log(responsabilites);
  return (
    <React.Fragment>
      <Head>
        <title>{meetingData ? meetingData.meetingName : 'Cargando'}</title>
      </Head>
      {meetingData && chat && responsabilites ? (
        <MeetingPage
          {...meetingData}
          chat={chat}
          responsabilities={responsabilites}
          token={token}
          notes={meetingData.notes}
          closeMeeting={closeMeeting}
          onChatSubmit={newChat => {
            // cuando se le da enter, al chat, emitir el mensaje al socket / server
            if (socket) {
              socket.emit(`message`, newChat);
            }
            // agregar el mensaje al chat
            setChat([...chat, newChat]);
          }}
          onCommandSubmit={newComm =>{
            if (socket) {
              socket.emit(`command`, newComm);
            }
            // agregar el mensaje al chat
            setRespons([...responsabilites, newComm]);
          }}
          handleResponsabilityD={id =>{
            console.log(id);
            const index = responsabilites.findIndex(obj => obj._id === id);
            const newArr = [
              ...responsabilites.slice(0, index),
              ...responsabilites.slice(index + 1)
            ]
            if(socket){
              socket.emit(`delete responsability`, id);
            }
            setRespons(newArr);
          }}
        />
      ) : (
        <h1>Loading ...</h1>
      )}
    </React.Fragment>
  );
};

export default withAuthSync(Meeting);
