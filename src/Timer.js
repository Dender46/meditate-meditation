import useInterval from "@use-it/interval";
import React, { useEffect, useRef, useState } from "react";

function Timer(props) {
  const [allTime, setAllTime] = useState(props.allTimeLeft);
  const [time, setTime] = useState(props.timeLeft);
  const [isOn, turnOn] = useState(false);
  const savedOnTimerUpdate = useRef();
  const savedOnTimerEnd = useRef();

  function startTimer() {
    props.onTimerStart();
    setTime(props.timeLeft);
    setAllTime(props.allTimeLeft);
    turnOn(true);
  }

  // save this callback here so that changes of props don't trigger other useEffect
  useEffect(() => {
    savedOnTimerUpdate.current = props.onTimerUpdate;
    savedOnTimerEnd.current = props.onTimerEnd;
  }, [props.onTimerUpdate, props.onTimerEnd]);

  useInterval(() => {
    if (!isOn) return;

    setTime(time - 1);
    setAllTime(allTime - 1);

    if (time === 0) {
      savedOnTimerUpdate.current();
      setTime(props.timeLeft);

      if (allTime === 0) {
        turnOn(false);
        setTime(0);
        setAllTime(0);
        savedOnTimerEnd.current();
        return;
      }
      return;
    }
  }, 1000);

  // this gets called when props are changed after call of saveOnTimerUpdate.current()
  useEffect(() => {
    setTime(props.timeLeft);
  }, [props.timeLeft]);

  function getTimeInString(secs) {
    var hours = Math.floor(secs / 3600);
    var minutes = Math.floor((secs - hours * 3600) / 60);
    var seconds = secs - hours * 3600 - minutes * 60;

    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    return minutes + ":" + seconds;
  }

  return (
    <div>
      <p className="overallTimer">Total: {getTimeInString(allTime)}</p>
      <p className="subTimer">{getTimeInString(time)}</p>
      <p className="currentExercise">{}</p>
      {!isOn && <button onClick={startTimer}>Start session</button>}
    </div>
  );
}

export default Timer;
