
function Home({ startGame }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-gray-800 text-white flex flex-col items-center justify-center px-6">

      <h1 className="text-7xl font-extrabold mb-4 tracking-wide">
        🌍 GlobeX
      </h1>

      <p className="text-xl text-gray-300 mb-10 text-center max-w-xl">
        Challenge your geography knowledge and guess countries using smart clues.
      </p>

      <button
        onClick={startGame}
        className="bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-2xl text-2xl font-semibold transition-all shadow-lg hover:scale-105"
      >
        ▶ Play Game
      </button>

    </div>
  );
}

export default Home;