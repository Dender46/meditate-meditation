import React, { useState } from "react";
import Sound from "react-sound";
import styled from "styled-components";
import Timer from "./Timer";

const bodyParts = [
  "forearm",
  "shoulder",
  "calves",
  "hip",
  "stomach",
  "chest",
  "neck",
  "lips",
  "eyebrows",
  "forehead"
];
const activationTime = 5;
const relaxingTime = 15;

function App() {
  const App = styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(20deg, rgb(219, 112, 147), rgb(218, 163, 87));
  `;

  const [isSessionEnd, setIsSessionEnd] = useState(false);
  const [partIndex, setPartIndex] = useState(0);
  const [isRelaxing, setIsRelaxing] = useState(false);

  const [shouldPlaySound, playSound] = useState(false);

  function onTimerUpdate() {
    if (isRelaxing) setPartIndex(partIndex + 1);
    setIsRelaxing(!isRelaxing);

    playSound(false);
    playSound(true);
  }

  function startSession() {
    setPartIndex(0);
    setIsSessionEnd(false);
  }

  function endSession() {
    setIsSessionEnd(true);
  }

  let statusText;
  if (isSessionEnd) statusText = <p>Session ended, good job!</p>;
  else if (isRelaxing) statusText = <p>Relax...</p>;
  else statusText = <p>Activate {bodyParts[partIndex]} muscles</p>;

  return (
    <App>
      <Sound
        url="beep.wav"
        playStatus={shouldPlaySound && Sound.status.PLAYING}
      />
      <Timer
        timeLeft={isRelaxing ? relaxingTime : activationTime}
        allTimeLeft={bodyParts.length * (activationTime + relaxingTime + 2) - 1}
        onTimerStart={startSession}
        onTimerUpdate={onTimerUpdate}
        onTimerEnd={endSession}
      />
      {statusText}
    </App>
  );
}

export default App;
