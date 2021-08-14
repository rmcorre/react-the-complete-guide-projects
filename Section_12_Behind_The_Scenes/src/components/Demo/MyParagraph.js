import React from 'react';

const MyParagraph = (props) => {
  console.log('MYPARAGRAPH RUNNING');
  return <p>{props.children}</p>;
};

export default MyParagraph;
