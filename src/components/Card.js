import { useEffect, useState } from "react";
import { useGlobalContext } from "../app/AppContext";

function Card() {
  const { questions, show, setShow, gameOverModal, setGameOverModal } =
    useGlobalContext();

  const [newArray, setNewArray] = useState(questions);
  const [display, setDisplay] = useState(newArray.slice(0, 10));
  const [checker, setChecker] = useState();
  const [count, setCount] = useState(0);
  const [score, setScore] = useState();
  const [answers, setAnswers] = useState();
  const [belowAverage] = useState([
    "Keep going, you're making progress!",
    "Believe in yourself and your abilities.",
    "Stay focused and stay positive, you can achieve your goals!",
    "Keep pushing yourself, you're capable of more than you think.",
    "You are capable, you are smart, and you are going to succeed!",
  ]);
  const [average] = useState([
    "You're doing great, don't give up!",
    "Mistakes are part of the learning process, keep trying!",
    "You've got this, just take it one step at a time.",
    "Keep up the good work, you're on the right track.",
    "Don't compare yourself to others, everyone learns at their own pace.",
  ]);
  const [aboveAverage] = useState([
    "Excellent work, you should be proud of yourself!",
    "Well done, you really nailed it!",
    "Impressive effort, keep it up!",
    "Outstanding job, you're really shining!",
    "You're a star student, keep aiming high!",
  ]);
  const [userRemarks, setUserRemarks] = useState("");
  useEffect(() => {
    setScore(Math.floor((count / questions.length) * 100));
  }, [count, questions.length]);

  useEffect(() => {
    let msg = Math.floor(Math.random() * 5);

    if (score < 50) {
      setUserRemarks(belowAverage[msg]);
    } else if (score > 50 && score < 80) {
      setUserRemarks(average[msg]);
    } else if (score > 80) {
      setUserRemarks(aboveAverage[msg]);
    }
  }, [
    belowAverage,
    average,
    aboveAverage,
    count,
    questions,
    userRemarks,
    score,
  ]);

  const correctHandler = (id) => {
    setNewArray((prevArray) => prevArray.filter((obj) => obj.id !== id));
    setDisplay((prevDisplay) => prevDisplay.filter((obj) => obj.id !== id));
    setChecker(newArray.length);
    setCount(count + 1);
    if (newArray.length === 1) {
      setGameOverModal(true);
    }
  };
  useEffect(() => {
    if (checker > 0) {
      setDisplay(newArray.slice(0, 10));
    }
  }, [checker, newArray]);

  const getAnswer = (index) => {
    setAnswers(display[index].answer);
    setShow(true);
  };
  return (
    <>
      <div className="app-container cards">
        <div className="card-container main">
          {display.map((test, index) => {
            const { question, id } = test;
            return (
              <div className="card" key={id}>
                <button onClick={() => correctHandler(id)}>correct</button>
                <div className="card-content" onClick={() => getAnswer(index)}>
                  <p>{question.toLowerCase()}</p>
                </div>
              </div>
            );
          })}

          {show ? (
            <div className="modal-container">
              <div className="modal-content" onClick={() => setShow(false)}>
                <div className="close">
                  <span>&times;</span>
                </div>
                <p>{answers}</p>
              </div>
            </div>
          ) : null}
          {gameOverModal ? (
            <div className="modal-container game">
              <div className="modal-content game-content">
                <div className="modal-sections">
                  <div className="modal-title"> Game Over</div>
                  <div className="modal-input remark">
                    <p>{userRemarks}</p>
                    <p> score : {score} %</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Card;
