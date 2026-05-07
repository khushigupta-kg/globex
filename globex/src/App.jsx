import { useEffect, useState } from "react";
import Home from "./components/Home";

function App() {
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Fetch country data
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

  // Loading screen
  if (!gameStarted) {
  return <Home startGame={() => setGameStarted(true)} />;
}

  // Loading state
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white text-2xl">
        Loading...
      </div>
    );
  }

  // Game Over screen
  if (gameOver) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-5xl font-bold mb-6">
          🎉 Game Over
        </h1>

        <p className="text-3xl mb-6">
          Final Score: {score}/10
        </p>

        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-xl transition-all"
        >
          Play Again
        </button>
      </div>
    );
  }

  // Generate options
  const generateOptions = () => {
    if (!countries.length || !currentCountry) return [];

    // correct answer
    const options = [currentCountry.name.common];

    // random wrong answers
    while (options.length < 4) {
      const randomCountry =
        countries[Math.floor(Math.random() * countries.length)].name.common;

      // avoid duplicates
      if (!options.includes(randomCountry)) {
        options.push(randomCountry);
      }
    }

    // shuffle options
    return options.sort(() => Math.random() - 0.5);
  };

  const options = generateOptions();

  // Check answer
  const checkAnswer = (option) => {
    if (option === currentCountry.name.common) {
      setResult("✅ Correct!");
      setScore(score + 1);
    } else {
      setResult("❌ Wrong!");
    }
  };

  // Next question
  const nextQuestion = () => {
    // End game after 10 questions
    if (questionNumber === 10) {
      setGameOver(true);
      return;
    }

    // Random new country
    const random =
      countries[Math.floor(Math.random() * countries.length)];

    setCurrentCountry(random);

    // Increase question number
    setQuestionNumber(questionNumber + 1);

    // Clear result
    setResult("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-gray-800 text-white flex flex-col items-center p-10">

      {/* Title */}
      <h1 className="text-5xl font-bold mb-4">
        🌍 GlobeX
      </h1>

      <p className="text-gray-300 mb-6">
        Guess the country using clues
      </p>

      {/* Score + Question */}
      <div className="flex gap-8 mb-8 text-lg">
        <p>🎯 Score: {score}</p>
        <p>❓ Question: {questionNumber}/10</p>
      </div>

      {/* Main Card */}
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-2xl">

        {/* Clues */}
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

        {/* Options */}
        <div className="grid grid-cols-2 gap-4 mt-8">

          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => checkAnswer(option)}
              className="bg-blue-600 hover:bg-blue-700 transition-all p-4 rounded-xl"
            >
              {option}
            </button>
          ))}

        </div>

        {/* Result */}
        <p className="text-2xl mt-6 text-center font-semibold">
          {result}
        </p>

        {/* Next Question Button */}
        <button
          onClick={nextQuestion}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 p-4 rounded-xl text-lg font-semibold transition-all"
        >
          Next Question
        </button>

      </div>
    </div>
  );
}

export default App;