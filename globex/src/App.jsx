import { useEffect, useState } from "react";
import Home from "./components/Home";
import bgVideo from "./assets/space.mp4";
import resultVideo from "./assets/result.mp4";

function App() {
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,region,languages,flags"
    )
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);

        const randomCountry =
          data[Math.floor(Math.random() * data.length)];

        setCurrentCountry(randomCountry);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

 
  const getFinalMessage = () => {
    if (score <= 4) {
      return "😅 Better luck next time!";
    }

    if (score <= 7) {
      return "🌍 Good job, Explorer!";
    }

    if (score <= 9) {
      return "🔥 Amazing geography skills!";
    }

    return "🏆 Geography Master!";
  };


  if (!gameStarted) {
    return (
      <Home
        startGame={() => setGameStarted(true)}
        playerName={playerName}
        setPlayerName={setPlayerName}
      />
    );
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white text-2xl">
        Loading...
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="relative h-screen flex flex-col items-center justify-center overflow-hidden text-white">


        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={resultVideo} type="video/mp4" />
        </video>


        <div className="absolute inset-0 bg-black/60"></div>


        <div className="relative z-10 text-center bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl">

          <h1 className="text-5xl font-bold mb-6">
            🎉 Game Over
          </h1>

          <p className="text-3xl mb-6">
            Final Score: {score}/10
          </p>

          <p className="text-2xl text-yellow-300 mb-8 font-semibold">
            {getFinalMessage()}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-xl transition-all"
          >
            Play Again
          </button>

        </div>
      </div>
    );
  }

  const generateOptions = () => {
    if (!countries.length || !currentCountry) return [];

    const options = [currentCountry.name.common];

    while (options.length < 4) {
      const randomCountry =
        countries[Math.floor(Math.random() * countries.length)].name.common;

      if (!options.includes(randomCountry)) {
        options.push(randomCountry);
      }
    }

    return options.sort(() => Math.random() - 0.5);
  };

  const options = generateOptions();


  const checkAnswer = (option) => {
    if (answered) return;

    setAnswered(true);

    if (option === currentCountry.name.common) {
      setResult("🎉 Congratulations! Correct Answer");
      setScore(score + 1);
    } else {
      setResult("❌ Wrong Answer!");
      setCorrectAnswer(currentCountry.name.common);
    }
  };


  const nextQuestion = () => {

    if (!answered) {
      alert("Please select an answer first!");
      return;
    }

    if (questionNumber === 10) {
      setGameOver(true);
      return;
    }

    const random =
      countries[Math.floor(Math.random() * countries.length)];

    setCurrentCountry(random);

    setQuestionNumber(questionNumber + 1);

    setResult("");
    setCorrectAnswer("");
    setAnswered(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white">


      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/60"></div>


      <div className="relative z-10 flex flex-col items-center w-full p-10">

        <h1 className="text-5xl font-bold mb-4">
          🌍 GlobeX
        </h1>

        <p className="text-gray-300 mb-6">
          Guess the country using clues
        </p>

        <div className="flex gap-8 mb-8 text-lg">
          <p>🎯 Score: {score}</p>
          <p>❓ Question: {questionNumber}/10</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-2xl">

          <div className="space-y-4 text-lg">

            <div className="bg-white/10 p-4 rounded-xl">
              🌍 Region: {currentCountry?.region}
            </div>

            <div className="bg-white/10 p-4 rounded-xl">
              🏙 Capital: {currentCountry?.capital?.[0] || "Unknown"}
            </div>

            <div className="bg-white/10 p-4 rounded-xl">
              🗣 Language: {
                currentCountry?.languages
                  ? Object.values(currentCountry.languages)[0]
                  : "Unknown"
              }
            </div>

          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">

            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => checkAnswer(option)}
                disabled={answered}
                className="bg-blue-600 hover:bg-blue-700 transition-all p-4 rounded-xl disabled:bg-gray-600"
              >
                {option}
              </button>
            ))}

          </div>

          <div className="text-center mt-6">

            <p className="text-2xl font-semibold">
              {result}
            </p>

            {correctAnswer && (
              <p className="text-xl text-green-400 mt-2">
                ✅ Correct Answer: {correctAnswer}
              </p>
            )}

          </div>

          <button
            onClick={nextQuestion}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 p-4 rounded-xl text-lg font-semibold transition-all"
          >
            Next Question →
          </button>

        </div>

      </div>
    </div>
  );
}

export default App;