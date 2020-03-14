import React from 'react';
interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const Image: React.FunctionComponent<ImageProps> = ({ children, ...props }) => {
  return <img {...props} />;
};

export default Image;
