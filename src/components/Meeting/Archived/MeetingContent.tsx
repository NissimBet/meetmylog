import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import ReactMde from 'react-mde';
import MDEContainer from './MDEContainer';
import { useLoginContext } from '../../../hooks/login';

interface MeetingContentProps {
  className?: string;
  notes: Notes[];
}

const MeetingContent: React.FunctionComponent<MeetingContentProps> = ({
  className,
  notes,
}) => {
  // el markdown editor funciona con los dos states
  // state para el valor del texto en markdown
  const { userId } = useLoginContext();
  const [value, setValue] = React.useState('');
  // satte para saber si se esta en el tab de escritura y de preview
  const [selectedTab, setSelectedTab] = React.useState<'preview'>('preview');

  const [note, setNote] = React.useState<Notes>(null);

  useEffect(() => {
    const index = notes.findIndex(id => id.member.userId == userId);
    setNote(notes[index]);
    console.log(note);
  }, [notes]);

  return (
    <MDEContainer className={className}>
      {note && (
        <ReactMde
          value={note.notes}
          selectedTab={selectedTab}
          readOnly={true}
          disablePreview={true}
          generateMarkdownPreview={markdown =>
            Promise.resolve(<ReactMarkdown source={markdown} />)
          }
        />
      )}
    </MDEContainer>
  );
};

export default MeetingContent;
