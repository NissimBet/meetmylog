import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import ReactMde from 'react-mde';
import MDEContainer from './MDEContainer';

interface MeetingContentProps {
  className?: string;
}

const MeetingContent: React.FunctionComponent<MeetingContentProps> = ({
  className,
}) => {
  // el markdown editor funciona con los dos states
  // state para el valor del texto en markdown
  const [value, setValue] = React.useState('');
  // satte para saber si se esta en el tab de escritura y de preview
  const [selectedTab, setSelectedTab] = React.useState<'write' | 'preview'>(
    'write'
  );
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
