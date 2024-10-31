import React from "react";

const Leaderboard = () => {
  return (
    <div className="bg-black text-white w-full h-full font-mono p-4 space-y-4">
      {/* Points Section */}
      <div className="text-center space-y-2">
        <h2 className="text-lg">YOUR POINTS</h2>
        <div className="bg-gray-600 rounded-lg p-2 flex justify-between">
          <span>Total Points</span>
          <span>1200</span>
        </div>
        <div className="bg-gray-600 rounded-lg p-2 flex justify-between">
          <span>Game Points</span>
          <span>1200</span>
        </div>
        <div className="bg-gray-600 rounded-lg p-2 flex justify-between">
          <span>Referral Points</span>
          <span>200</span>
        </div>
        <div className="bg-gray-600 rounded-lg p-2 flex justify-between">
          <span>Social Points</span>
          <span>200</span>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="border-2 border-blue-500 p-4 rounded-lg">
        <h2 className="text-center text-lg">LEADERBOARD</h2>
        <div className="flex justify-center space-x-4 text-xs mt-2 border-b border-gray-400 pb-2">
          <button className="text-white border-b-2 border-white">Daily</button>
          <button>Weekly</button>
          <button>All Time</button>
        </div>
        <div className="mt-4 space-y-2">
          {[1, 2, 3, 4, 5, 6].map((rank) => (
            <div
              key={rank}
              className="bg-gray-500 rounded-lg p-2 flex justify-between items-center"
            >
              <span className="bg-black text-white p-2 rounded-full w-8 h-8 flex items-center justify-center">
                {rank}
              </span>
              <span className="flex-1 text-center">USERNAME</span>
              <span>300</span>
            </div>
          ))}
        </div>
        <p className="text-center text-xs mt-4">Your Position: 40 / 120000</p>
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-around bg-gray-800 p-4 mt-4 rounded-lg">
        <button className="bg-white text-black py-2 px-4 rounded">Play</button>
        <button className="bg-white text-black py-2 px-4 rounded">
          Leaderboard
        </button>
        <button className="bg-white text-black py-2 px-4 rounded">Friends</button>
      </div>
    </div>
  );
};

export default Leaderboard;