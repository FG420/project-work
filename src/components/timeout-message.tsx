import React, { useEffect, useRef, useState } from "react";

export const TimeoutFunction = () => {
  const [isShown, setIsShown] = useState(false);

  // the timer is set or not
  const [isRunning, setIsRunning] = useState(false);

  // use ref to store the timer id
  const refTimer = useRef<number | null>(null);

  // show the box after 5 seconds
  const showBox = () => {
    if (refTimer.current !== null) return;
    setIsRunning(true);
    refTimer.current = window.setTimeout(() => {
      setIsShown(true);
      setIsRunning(false);
    }, 30000);
  };

  // prevent the box from being shown by clearing the timer
  const stopTimeout = () => {
    if (refTimer.current === null) return;
    window.clearTimeout(refTimer.current);
    refTimer.current = null;
    setIsRunning(false);
  };

  // Cleanup function to clear the timer when the component unmounts
  useEffect(() => {
    // cleanup function
    return () => {
      if (refTimer.current !== null) {
        window.clearTimeout(refTimer.current);
      }
    };
  }, []);

  return (
    <div className="container">
      <div className="buttons">
        {/* This button is used to start the timer */}
        <button
          disabled={isRunning || isShown}
          onClick={showBox}
          className="button-show"
        >
          Show
        </button>

        {/* This button is used to cancel the timer */}
        <button
          disabled={!isRunning}
          onClick={stopTimeout}
          className="button-stop"
        >
          Cancel
        </button>
      </div>

      {/* Some useful messages */}
      {!isRunning && !isShown && (
        <p>Click the "Show" button and wait 5 seconds to see the blue box</p>
      )}

      {isRunning && (
        <p>Press the "Cancel" button to prevent the box from shows up</p>
      )}

      {/* The box */}
      {isShown && (
        <div className="box">
          <h1>Welcome to KindaCode.com</h1>
        </div>
      )}
    </div>
  );
};
