import React from "react";
import { useGlobalContext } from "../app/AppContext";
function Timer() {
  const { seconds, gameOverModal } = useGlobalContext();
  return (
    <div className="timer-container">
      {gameOverModal ? (
        <h1 className="time" style={{ color: "white", fontSize: "3em" }}>
          0
        </h1>
      ) : (
        <div className="time">
          <h1>{seconds}</h1>
        </div>
      )}
    </div>
  );
}

export default Timer;
