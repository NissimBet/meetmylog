import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import ReactMde from 'react-mde';
import axios from 'axios';
import MDEContainer from './MDEContainer';
import { BACKEND_URI } from '../../utils/config';
import { useLoginContext } from '../../hooks/login';

interface MeetingContentProps {
  className?: string;
  userToken: string;
  meetingId: string;
  notes: Notes[];
}
const MeetingContent: React.FunctionComponent<MeetingContentProps> = ({
  className,
  userToken,
  meetingId,
  notes,
}) => {
  // el markdown editor funciona con los dos states
  // state para el valor del texto en markdown
  const [value, setValue] = React.useState('');
  const { userId } = useLoginContext();
  // satte para saber si se esta en el tab de escritura y de preview
  const [selectedTab, setSelectedTab] = React.useState<'write' | 'preview'>(
    'write'
  );
  const submtiNotes = (value: string) => {
    axios
    .put(
      `${BACKEND_URI}/meeting/notes/${meetingId}`,
      {
        member: userId,
        notes: value,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    )
    .then(response => {

    })
    .catch(err => console.log(err));

  };
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function reset() {
    setSeconds(0);
  }

  useEffect(() => {
    let interval: number = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  useEffect(() =>{
    setIsActive(true);
    reset();
  }, [value]);

  if(seconds > 5){
    console.log(seconds);
    setIsActive(false);
    reset();
    submtiNotes(value);
  }

  useEffect(()=>{
    if (notes.some(e => e.member.userId == userId)){
      const index = notes.findIndex((id) => id.member.userId == userId);
      setValue(notes[index].notes);
      console.log(value);
    }
  },[notes]);

  return (
    <MDEContainer className={className}>
      <ReactMde
        value={value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown =>
          Promise.resolve(<ReactMarkdown source={markdown} />)
        }
      />
    </MDEContainer>
  );
};

export default MeetingContent;
