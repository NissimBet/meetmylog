import React from 'react';

interface MeetingContentProps {
  className?: string;
}

const MeetingContent: React.FunctionComponent<MeetingContentProps> = ({
  className,
}) => {
  return (
    <div className={className}>
      <h1>Content</h1>
    </div>
  );
};

export default MeetingContent;
