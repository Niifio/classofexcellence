import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [mode, setMode] = useState("medium");
  const [type, setType] = useState("idiom");
  const [show, setShow] = useState(false);
  const [answers, setAnswers] = useState();
  //   const [pages, setPages] = useState(0);
  //   const [cleared, setCleared] = useState();
  const [seconds, setSeconds] = useState(60);
  const [gameOverModal, setGameOverModal] = useState(false);
  const [endGame, setEndGame] = useState(true);
  const [game, setGame] = useState("Word game!");
  const [showGameModal, setShowGameModal] = useState(false);

  // Fetching Data
  const fetchData = async () => {
    const data = await fetch("https://niifio.github.io/eslrestApi/api.json");
    const result = await data.json();
    let results = result.data;
    const set = results.filter(
      (item) => item.type === type && item.mode === mode
    );
    for (let i = set.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [set[i], set[j]] = [set[j], set[i]];
    }
    setLoading(false);
    setQuestions(set);
  };
  //   console.log(questions);
  //   const filterItems = (results) => {
  //     const set = results.filter((item) => {
  //       return item.mode === mode && item.type === type;
  //     });
  //     shuffledItem(set);
  //   };

  //   const shuffledItem = (set) => {
  //     for (let i = set.length - 1; i > 0; i--) {
  //       const j = Math.floor(Math.random() * (i + 1));
  //       [set[i], set[j]] = [set[j], set[i]];
  //     }
  //     setQuestions(set);
  //   };

  //Checking the answer by opening the modal
  const getAnswer = (index) => {
    setAnswers(questions[index].answer);
    setShow(true);
  };

  //filtering the answered questions

  // choosing the time duration
  const getTime = (e) => {
    let time = e.target.innerHTML;
    setSeconds(time);
  };

  // constructing the timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (!endGame) {
        setSeconds((prev) => {
          if (prev === 0) {
            setSeconds(0);
            setGameOverModal(true);
            clearInterval(timer);
          } else {
            return prev - 1;
          }
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [endGame]);

  const getMode = (e) => {
    if (e.target.innerHTML === "Mid") {
      setMode("medium");
    } else if (e.target.innerHTML === "Hard") {
      setMode("difficult");
    }
    console.log(e.target.innerHTML);
  };

  // Getting the name of the Game

  const getGameName = (e) => {
    if (e.target.innerHTML === "riddle game!") {
      setType("riddle");
    } else if (e.target.innerHTML === "idiom game!") {
      setType("idiom");
    } else {
      setType("words");
    }
    console.log(e.target.innerHTML);
    setGame((prev) => (prev = e.target.innerHTML));
    setGameOverModal(false);
    setShowGameModal(true);
  };

  // closing the game modal
  const closeGameModal = () => {
    setShowGameModal(false);
  };

  // navigating between the homepage and the game board
  const gameOver = () => {
    setEndGame(false);
  };

  // Canceling current game to start a new one
  const cancelGame = () => {
    setEndGame(true);
    setShowGameModal(false);
    setGameOverModal(false);
    setSeconds((prev) => (prev = 60));
  };
  useEffect(() => {
    if (gameOverModal === true) {
      setShow(false);
    }
  }, [gameOverModal]);
  useEffect(() => {
    fetchData();
  }, [mode, type]);
  return (
    <AppContext.Provider
      value={{
        questions,
        show,
        game,
        type,
        mode,
        showGameModal,
        gameOverModal,
        answers,
        loading,
        seconds,
        endGame,
        setShowGameModal,
        getTime,
        fetchData,
        setShow,
        getAnswer,
        getMode,
        getGameName,
        closeGameModal,
        gameOver,
        cancelGame,
        setSeconds,
        setGameOverModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
