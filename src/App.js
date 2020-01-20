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
const activationTime = 10;
const relaxingTime = 15;

const StyledApp = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(20deg, rgb(219, 112, 147), rgb(218, 163, 87));
`;

function App() {
  const [isSessionEnd, setIsSessionEnd] = useState(false);
  const [partIndex, setPartIndex] = useState(0);
  const [isRelaxing, setIsRelaxing] = useState(false);

  const [isPlayingSound, setIsPlayingSound] = useState(Sound.status.PAUSED);

  function onTimerUpdate() {
    setPartIndex(partIndex + 1);

    setIsPlayingSound(Sound.status.PAUSED);
    setIsPlayingSound(Sound.status.PLAYING);
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
  else statusText = <p>Activate {bodyParts[partIndex]}</p>;

  return (
    <StyledApp>
      <Sound url="beep.wav" playStatus={isPlayingSound} />
      <Timer
        timeLeft={activationTime}
        allTimeLeft={bodyParts.length * (activationTime + 1) - 1}
        onTimerStart={startSession}
        onTimerUpdate={onTimerUpdate}
        onTimerEnd={endSession}
      />
      {statusText}
    </StyledApp>
  );
}

export default App;
