import React, { useState } from "react";
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
  const [isSessionEnd, setIsSessionEnd] = useState(false);
  const [partIndex, setPartIndex] = useState(0);
  const [isRelaxing, setIsRelaxing] = useState(false);

  function setNextBodyPart() {
    if (isRelaxing) setPartIndex(partIndex + 1);
    setIsRelaxing(!isRelaxing);
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
    <div className="App">
      <Timer
        timeLeft={isRelaxing ? relaxingTime : activationTime}
        allTimeLeft={bodyParts.length * (activationTime + relaxingTime + 2) - 1}
        onTimerStart={startSession}
        onTimerUpdate={setNextBodyPart}
        onTimerEnd={endSession}
      />
      {statusText}
    </div>
  );
}

export default App;
