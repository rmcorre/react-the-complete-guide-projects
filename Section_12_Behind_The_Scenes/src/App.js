import React, { useState, useCallback } from 'react';

import './App.css';
import Button from './components/UI/Button/Button';
import DemoOutput from './components/Demo/DemoOutput';

function App() {
  console.log('APP RUNNING');

  const [showParagraph, setShowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(true);

  //There are no dependencies for the useCallback()
  //so allowedToggleHandler is created only once
  //when the App first executes.
  const allowedToggleHandler = useCallback(() => {
    setAllowToggle(true);
  }, []);

  //Because allowToggle never changes
  //this function is only created when the App first starts
  //therefore never triggering a state change in the Button
  //component where it is used as a prop and preventing
  //Button from re-executing and re-rendering.
  const toggleParagraphHandler = useCallback(() => {
    setShowParagraph((prevShowParagraph) => !prevShowParagraph);
  }, [allowToggle]);

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={showParagraph} />
      <Button onclick={allowedToggleHandler}>Allow Toggling</Button>
      <Button onClick={toggleParagraphHandler}>Toggle Paragraph</Button>
    </div>
  );
}

export default App;
