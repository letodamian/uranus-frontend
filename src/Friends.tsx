/* eslint-disable @typescript-eslint/no-unused-vars */
import { MdContentCopy } from "react-icons/md";
import React, { useEffect, useRef, useState } from "react";
import { IRefPhaserGame, PhaserGame } from "./game/PhaserGame";
import { EventBus } from "./game/EventBus";

import { useNavigate } from "react-router-dom";
import CopyToClipboard from "./components/copyToClipboard";
import RankPanel from "./components/RankPanel";
import FriendPanel from "./components/Friendpanel";
import SocialButton from "./components/SocialTask";

const Friends = () => {
    const inviteCount = 5;
    const inviteLink = "esd3dd";
    const [isGameOver, setIsGameOver] = useState(true);

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
        <div className=" text-white w-full h-full px-4 pb-4 pt-10 space-y-4 font-['ArcadeClassic']  bg-[url('/assets/background.jpeg')] bg-cover overflow-scroll">
            {/* friends Section */}
            <div className="flex flex-col pt-4 ">
                <div className="text-3xl uppercase">friends</div>
                <div className="text-2xl uppercase">
                    invite your friends and earn 10% of their points
                </div>
                <div className="text-xl bg-[#151416] flex justify-center py-2 rounded-lg my-2">
                    Invite Friends{" "}
                    <span>
                        <CopyToClipboard text={inviteLink} />
                    </span>
                </div>
                <div>
                    <div className="text-xl uppercase">
                        invite:{inviteCount}friends
                    </div>
                    <div>
                        <div className="m-2 row">
                            {[1, 2, 3, 4, 5].map((index) => (
                                <FriendPanel
                                    key={index}
                                    userName="@USERNAME"
                                ></FriendPanel>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="text-xl uppercase">Social task</div>
                    <div className="text-xl uppercase">
                        Earn +50 points per task
                    </div>
                    <div>
                        <div className="m-2 row">
                            <SocialButton
                                label="twitter"
                                content="FOLLOW $URANUS"
                                link="https://www.figma.com/design/hUr2pKa7rT4DqkdSB79uTn/URANUS?node-id=39-226&node-type=frame&t=vpRWTE5JwCNiOz3r-0"
                            ></SocialButton>
                            <SocialButton
                                label="twitter"
                                content="FOLLOW ARES"
                                link="abc"
                            ></SocialButton>
                            <SocialButton
                                label="telegram"
                                content="JOIN COMMUNITY"
                                link="abc"
                            ></SocialButton>
                            <SocialButton
                                label="telegram"
                                content="JOIN CHANNEL"
                                link="abc"
                            ></SocialButton>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer Navigation */}
            <div className=" w-full bottom-2 left-0 flex justify-between p-4 gap-1">
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

export default Friends;
