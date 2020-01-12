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
  const [partIndex, setPartIndex] = useState(0);
  const [isRelaxing, setIsRelaxing] = useState(false);

  function setNextBodyPart() {
    setPartIndex(partIndex + 1);
    setIsRelaxing(!isRelaxing);
  }

  return (
    <div className="App">
      <Timer
        timeLeft={isRelaxing ? relaxingTime : activationTime}
        onTimerUpdate={setNextBodyPart}
      />
      {isRelaxing && <p>Relax...</p>}
      {!isRelaxing && <p>Activate {bodyParts[partIndex]} muscles</p>}
    </div>
  );
}

export default App;
