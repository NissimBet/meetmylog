import React, { useState, useEffect } from 'react';
// import { Editor, EditorState, RichUtils } from 'draft-js';

interface MeetingContentProps {
  className?: string;
}

const MeetingContent: React.FunctionComponent<MeetingContentProps> = ({
  className,
}) => {
  return (
    <React.Fragment>
      <div className={className}></div>
    </React.Fragment>
  );
};

export default MeetingContent;
