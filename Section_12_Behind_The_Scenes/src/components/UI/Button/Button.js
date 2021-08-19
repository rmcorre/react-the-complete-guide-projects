import React from 'react';

import classes from './Button.module.css';

const Button = (props) => {
  //props.onClick changes everytime the App is re-executed
  //because allowedToggleHandler in App is re-created everytime
  //App is re-executed.
  //Remember, functions are objects and when objects are created,
  //they have a different address in memory.
  //So the state (props.onClick) changes eveytime triggering
  //a re-execution of the Button component.
  //But the button has nothing about it that should be updated
  //so, we should stop the re-execution and re-rendering of button
  //by using useCallback() on the allowedToggleHandler in the App component.
  console.log('BUTTON MOUNTED');
  return (
    <button
      type={props.type || 'button'}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default React.memo(Button);
