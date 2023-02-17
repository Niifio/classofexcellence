import { useGlobalContext } from "./app/AppContext";
import Timer from "./components/Timer";
import Card from "./components/Card";
import HomePage from "./page/HomePage";
import Loader from "./components/Loader";
function App() {
  const { endGame, cancelGame, gameOverModal, loading } = useGlobalContext();

  return (
    <>
      <div className="app-container">
        {endGame ? (
          <HomePage />
        ) : (
          <>
            {loading ? (
              <Loader />
            ) : (
              <>
                <div>
                  <div className="timer">
                    <Timer />
                  </div>
                  <div className="container">
                    <Card />
                  </div>
                </div>
                <button className="cancel-btn" onClick={cancelGame}>
                  {gameOverModal ? "Start Over" : "End Game"}
                </button>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
