import React, { useState, useCallback } from 'react';

import './App.css';
import Button from './components/UI/Button/Button';
import DemoOutput from './components/Demo/DemoOutput';

function App() {
  console.log('APP RUNNING');

  const [showParagraph, setShowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(true);

  const allowedToggleHandler = () => {
    setAllowToggle(true);
  };

  //Anytime a component is re-evaluated, its functions are re-created.
  //useCallback re-creates the function and stores it in React memory.
  //Now, when a component is re-evaluated, any function with the useCallback hook
  //will not be re-created.
  //However, functions that have outside variables whose value might change
  //need to update those variables from the last time it was stored

  //Use useCallback if you know a function should never change and shouldn't be re-created.
  //No dependencies if there are no outside variables
  //Include outside variables in the dependency array if the function uses outside variables
  //Those variables should be updated everytime they change
  //If they don't change, the function isn't recreated
  //The function is re-created only for the variables in the dependency array that change
  const toggleParagraphHandler = useCallback(() => {
    if (allowToggle) {
      setShowParagraph((prevShowParagraph) => !prevShowParagraph);
    }
  }, [allowToggle]);

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={false} />
      <Button onClick={toggleParagraphHandler}>Toggle Paragraph</Button>
    </div>
  );
}

export default App;
