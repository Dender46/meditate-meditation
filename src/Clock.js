import React, { useEffect, useState } from "react";

function Timer(props) {
  const [time, setTime] = useState(props.leftTime || 60);
  const [isOn, turnOn] = useState(false);

  function startTimer() {
    turnOn(true);
  }

  useEffect(() => {
    if (!isOn) return;

    setTimeout(() => {
      setTime(time - 1);
    }, 1000);
  });

  function getTimeString(secs) {
    var hours = Math.floor(secs / 3600);
    var minutes = Math.floor((secs - hours * 3600) / 60);
    var seconds = secs - hours * 3600 - minutes * 60;

    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    return minutes + ":" + seconds;
  }

  return (
    <div>
      <p>{getTimeString(time)}</p>
      <button onClick={startTimer}>Start session</button>
    </div>
  );
}

export default Timer;
