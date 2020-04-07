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
  const [value, setValue] = React.useState('');
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
