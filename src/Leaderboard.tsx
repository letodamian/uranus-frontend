/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import PointPanel from "./components/PointPanel";
import RankPanel from "./components/RankPanel";
import { IRefPhaserGame, PhaserGame } from "./game/PhaserGame";
import { EventBus } from "./game/EventBus";

import { useNavigate } from "react-router-dom";
import { useFetchLeaderBoard } from "./hook/useFetchLeaderBoard";
interface Rank {
    userName: string;
    points: number;
}

const Leaderboard = () => {
    const { data, isLoading, refetch } = useFetchLeaderBoard();
    const scoreLabel = ["totalScore"];
    console.log("lbdata:", data);
    const [isGameOver, setIsGameOver] = useState(true);
    const [isDaily, setIsDaily] = useState(0);

    const handleClick = (n: number) => {
        setIsDaily(n);
    };

    const navigate = useNavigate();
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    const goToHome = () => {
        navigate("/");
    };
    const goToLeaderboard = () => {
        navigate("/leaderboard");
    };
    const goToFriends = () => {
        navigate("/friends");
    };
    useEffect(() => {
        const handleGameOver = () => {
            setIsGameOver(true);
        };
        EventBus.on("game-over", handleGameOver);
        EventBus.on("game-play", () => {
            setIsGameOver(false);
        });

        // Clean up on unmount
        return () => {
            EventBus.off("game-over", handleGameOver);
        };
    }, []);
    return (
        <div className=" text-white w-full max-w-sm h-screen px-4 pb-16 pt-10 font-['ArcadeClassic']  bg-[url('/assets/background.jpeg')] bg-cover relative">
            {/* Points Section */}
            <div className="h-full overflow-auto no-scrollbar">
                <div className="space-y-2">
                    <h2 className="text-2xl font-['ArcadeClassic']">
                        YOUR POINTS
                    </h2>
                    <PointPanel
                        label="TOTAL POINTS"
                        points={data?.totalScore ?? 0}
                    />
                    <PointPanel
                        label="GAME POINTS"
                        points={data?.gameScore ?? 0}
                    />
                    <PointPanel
                        label="REFERRAL POINTS"
                        points={data?.refScore ?? 0}
                    />
                    <PointPanel
                        label="SOCIAL POINTS"
                        points={data?.socialScore ?? 0}
                    />
                </div>

                {/* Leaderboard Section */}
                <div className="rounded-lg">
                    <h2 className="text-2xl">LEADERBOARD</h2>
                    <div className="flex justify-start space-x-4 text-lg mt-2 border-b border-gray-400 pb-2">
                        <button
                            onClick={() => setIsDaily(1)}
                            className={`text-white ${
                                isDaily === 1 ? "border-b-2" : ""
                            } border-white`}
                        >
                            Daily
                        </button>
                        <button
                            onClick={() => setIsDaily(2)}
                            className={`text-white ${
                                isDaily === 2 ? "border-b-2" : ""
                            } border-white`}
                        >
                            Weekly
                        </button>
                        <button
                            onClick={() => setIsDaily(0)}
                            className={`text-white ${
                                isDaily === 0 ? "border-b-2" : ""
                            } border-white`}
                        >
                            All Time
                        </button>
                    </div>
                    <div className="m-2 row">
                        {data?.leaderBoard[isDaily].map(
                            (rank: Rank, index: number) => (
                                <RankPanel
                                    key={index}
                                    ranking={index + 1}
                                    userName={rank.userName}
                                    points={rank.points}
                                />
                            )
                        )}
                    </div>
                    <p className="text-center text-lg mt-4">
                        {data?.ranking && (
                            <>
                                Your Position:{" "}
                                {Object.values(data.ranking)[isDaily + 1]} /{" "}
                                {data.ranking.totalUsers}
                            </>
                        )}
                    </p>
                </div>
            </div>
            {/* Footer Navigation */}
            <div className="absolute w-full bottom-2 left-0 flex justify-between p-4 gap-1">
                <button
                    onClick={goToHome}
                    className="bg-white hover:bg-slate-500 active:bg-white text-black font-bold py-2 px-4 rounded-lg shadow-md font-['ArcadeClassic']"
                >
                    PLAY
                </button>
                <button
                    onClick={goToLeaderboard}
                    className="bg-white hover:bg-slate-500 active:bg-white  text-black font-bold py-2 px-4 rounded-lg shadow-md font-['ArcadeClassic']"
                >
                    LEADERBOARD
                </button>
                <button
                    onClick={goToFriends}
                    className="bg-white hover:bg-slate-500 active:bg-white text-black font-bold py-2 px-4 rounded-lg shadow-md font-['ArcadeClassic']"
                >
                    FRIENDS
                </button>
            </div>
        </div>
    );
};

export default Leaderboard;
