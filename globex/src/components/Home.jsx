function Home({
  startGame,
  playerName,
  setPlayerName,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e293b] flex items-center justify-center px-6">

      
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-2xl text-center">

       
        <div className="text-7xl mb-4 animate-pulse">
          🌍
        </div>

       
        <h1 className="text-6xl font-extrabold text-white tracking-wide mb-4">
          GlobeX
        </h1>

        
        <p className="text-gray-300 text-lg leading-relaxed mb-10">
          Explore the world through clues, challenge your geography knowledge,
          and become the ultimate world explorer.
        </p>

        
        <div className="flex flex-col items-center gap-5">

          <input
            type="text"
            placeholder="Enter your name..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full max-w-md px-6 py-4 rounded-2xl bg-white/20 border border-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400 text-lg shadow-lg"
          />

          
          <button
            onClick={startGame}
            disabled={!playerName}
            className="w-full max-w-md bg-blue-600 hover:bg-blue-700 transition-all duration-300 py-4 rounded-2xl text-xl font-semibold text-white shadow-xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            ▶ Start Adventure
          </button>

        </div>


      </div>
    </div>
  );
}

export default Home;