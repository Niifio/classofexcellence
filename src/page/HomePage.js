import { useGlobalContext } from "../app/AppContext";

function HomePage() {
  const {
    game,
    showGameModal,
    closeGameModal,
    getGameName,
    getTime,
    gameOver,
    getMode,
  } = useGlobalContext();

  return (
    <>
      <div className="home-container main">
        <div className="home-content">
          <div className="intro-card">
            <h1>
              <span className="red">Fes</span> House
            </h1>
            <p>Class of Excellence!</p>
          </div>
          <p className="game-select">Select Game</p>
          <div className="game-cards">
            <div
              className="game-card word bounce"
              //   dangerouslySetInnerHTML={{ __html: wordGame }}
              onClick={(e) => getGameName(e)}
            >
              word game!
            </div>

            <div
              className="game-card idiom bounce"
              onClick={(e) => getGameName(e)}
            >
              idiom game!
            </div>

            <div
              className="game-card riddle bounce"
              onClick={(e) => getGameName(e)}
            >
              riddle game!
            </div>
          </div>
        </div>
      </div>
      {showGameModal ? (
        <div className="modal-container game">
          <div className="modal-content game-content">
            <div className="close" onClick={closeGameModal}>
              <span>&times;</span>
            </div>
            <div className="modal-sections">
              <div className="modal-title"> {game}</div>
              <div className="modal-input">
                <div className="modal-mode">
                  <p>Mode:</p>
                  <ul>
                    <li onClick={(e) => getMode(e)}>Mid</li>
                    <li onClick={(e) => getMode(e)}>Hard</li>
                  </ul>
                </div>
                <div className="modal-timer">
                  <p>Time:</p>
                  <ul>
                    <li onClick={(e) => getTime(e)}>60</li>
                    <li onClick={(e) => getTime(e)}>120</li>
                    <li onClick={(e) => getTime(e)}>180</li>
                  </ul>
                </div>
              </div>
            </div>
            <button onClick={gameOver}>Start</button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default HomePage;
