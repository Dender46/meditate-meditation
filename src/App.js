import React, { useState } from "react";
import styled from "styled-components";
import Timer from "./Timer";
import beepAudio from "./resources/beep.wav";
import UIFx from "uifx";

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
const activationTime = 2;
const relaxingTime = 15;

const StyledApp = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(20deg, rgb(219, 112, 147), rgb(218, 163, 87));
`;

const beep = new UIFx(
  beepAudio,
  {
    volume: 1,
    throttleMs: 100
  }
);

function App() {
  const [isSessionEnd, setIsSessionEnd] = useState(false);
  const [partIndex, setPartIndex] = useState(0);
  const [isRelaxing, setIsRelaxing] = useState(false);

  function onTimerUpdate() {
    setPartIndex(partIndex + 1);

    beep.play();
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
