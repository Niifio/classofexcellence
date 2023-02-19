import React from "react";
import { useGlobalContext } from "../app/AppContext";
import { FaTimes } from "react-icons/fa";

function Timer() {
  const { seconds, gameOverModal, cancelGame } = useGlobalContext();
  return (
    <div className="timer-container head">
      {gameOverModal ? (
        <h1 className="time" style={{ color: "white", fontSize: "3em" }}>
          0
        </h1>
      ) : (
        <div className="time">
          <h1>{seconds}</h1>
        </div>
      )}
      <div onClick={cancelGame}>
        <FaTimes className="times" />
      </div>
    </div>
  );
}

export default Timer;
