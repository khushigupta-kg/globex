import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");

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

  // Loading state
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white text-2xl">
        Loading...
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
    } else {
      setResult("❌ Wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-gray-800 text-white flex flex-col items-center p-10">

      {/* Title */}
      <h1 className="text-5xl font-bold mb-4">🌍 GlobeX</h1>

      <p className="text-gray-300 mb-10">
        Guess the country using clues
      </p>

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

        {/* Option Buttons */}
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

      </div>
    </div>
  );
}

export default App;