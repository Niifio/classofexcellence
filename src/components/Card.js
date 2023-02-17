import { useEffect, useState } from "react";
import { useGlobalContext } from "../app/AppContext";
import remarks from "../app/studentRemarks";

function Card() {
  const {
    loading,
    questions,
    show,
    answers,
    getAnswer,
    setShow,
    gameOverModal,
    setGameOverModal,
  } = useGlobalContext();

  const { belowAverage, aboveAverage, average } = remarks;

  //   console.log(questions);
  const [newArray, setNewArray] = useState(questions);
  const [display, setDisplay] = useState(newArray.slice(0, 10));
  const [checker, setChecker] = useState();
  const [count, setCount] = useState(0);
  const [userRemarks, setUserRemarks] = useState("");
  useEffect(() => {
    if (Math.floor((count / questions.length) * 100) < 50) {
      let belowAverager = Math.floor(Math.random() * belowAverage.length);
      setUserRemarks(belowAverage[belowAverager]);
    } else if (
      Math.floor((count / questions.length) * 100) > 50 &&
      Math.floor((count / questions.length) * 100) < 80
    ) {
      let averager = Math.ceil(Math.random() * average.length);
      setUserRemarks(average[averager]);
    } else if (Math.floor((count / questions.length) * 100) > 80) {
      let aboveAverager = Math.ceil(Math.random() * aboveAverage.length);
      setUserRemarks(aboveAverage[aboveAverager]);
    }
  }, [belowAverage, average, aboveAverage, count, questions, userRemarks]);

  const correctHandler = (id) => {
    setNewArray((prevArray) => prevArray.filter((obj) => obj.id !== id));
    setDisplay((prevDisplay) => prevDisplay.filter((obj) => obj.id !== id));
    setChecker(newArray.length);
    setCount(count + 1);
    if (newArray.length === 1) {
      console.log("getting there");
      setGameOverModal(true);
      //   setSeconds();
    }
  };
  useEffect(() => {
    if (checker > 0) {
      setDisplay(newArray.slice(0, 10));
    }
  }, [checker, newArray]);
  return (
    <>
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
                <p> score : {Math.floor((count / questions.length) * 100)} %</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Card;
