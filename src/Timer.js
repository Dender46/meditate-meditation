import React, { useEffect, useRef, useState } from "react";

function Timer(props) {
  const [time, setTime] = useState(props.timeLeft || 60);
  const savedOnTimerUpdate = useRef();

  function startTimer() {
    turnOn(true);
  }

  useEffect(() => {
    savedOnTimerUpdate.current = props.onTimerUpdate;
  }, [props.onTimerUpdate]);

  useEffect(() => {
    setTimeout(() => {
      if (time === 0) {
        savedOnTimerUpdate.current();
        return;
      }
      setTime(time - 1);
    }, 1000);
  }, [time]);

  useEffect(() => {
    setTime(props.timeLeft);
  }, [props.timeLeft]);

  const [isOn, turnOn] = useState(false);

  function getOverallTimeLeft(secs) {
    var hours = Math.floor(secs / 3600);
    var minutes = Math.floor((secs - hours * 3600) / 60);
    var seconds = secs - hours * 3600 - minutes * 60;

    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    return minutes + ":" + seconds;
  }

  return (
    <div>
      <p className="overallTime">{getOverallTimeLeft(time)}</p>
      <p className="currentExercise">{}</p>
      {!isOn && <button onClick={startTimer}>Start session</button>}
    </div>
  );
}

export default Timer;
