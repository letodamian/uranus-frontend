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
import { useFetchRef } from "./hook/useFetchRef";

interface Friend {}

const Friends = () => {
    const { data, isLoading, refetch } = useFetchRef();
    const inviteCode = data?.inviteCode;
    const inviteLink = `https://t.me/UranusGameBot?start=${inviteCode}`;
    const [isGameOver, setIsGameOver] = useState(true);
    const inviteCount = data?.friends?.length ?? 0;
    const navigate = useNavigate();
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const inviteFriends = () => {
        const link = `https://t.me/share/url?url =${inviteLink}`
        window.open(link, "_blank", "noopener,noreferrer");
    }
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
            {/* friends Section */}
            <div className="h-full overflow-scroll no-scrollbar">
                <div className="space-y-2">
                    <div className="text-3xl uppercase">friends</div>
                    <div className="text-2xl uppercase">
                        invite your friends and earn 10% of their points
                    </div>
                    <div className="text-xl bg-[#151416] flex flex-col justify-center py-2 rounded-lg my-2">
                        <div onClick={inviteFriends}>Invite Friends</div>{" "}
                        <CopyToClipboard text={inviteLink} />
                    </div>
                    <div>
                        <div className="text-xl uppercase">
                            invite:{inviteCount}friends
                        </div>
                        <div>
                            <div className="m-2 row">
                                {data?.friends?.map(
                                    (friend: string, index: number) => (
                                        <FriendPanel
                                            key={index}
                                            userName={friend}
                                        ></FriendPanel>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="pb-12">
                        <div className="text-xl uppercase">Social task</div>
                        <div className="text-xl uppercase">
                            Earn +50 points per task
                        </div>
                        <div>
                            <div className="m-2 row">
                                {/* <SocialButton
                                label="twitter"
                                content="FOLLOW $URANUS"
                                link="https://www.figma.com/design/hUr2pKa7rT4DqkdSB79uTn/URANUS?node-id=39-226&node-type=frame&t=vpRWTE5JwCNiOz3r-0"
                            ></SocialButton>
                            <SocialButton
                                label="twitter"
                                content="FOLLOW ARES"
                                link="abc"
                            ></SocialButton> */}
                                <SocialButton
                                    label="telegram"
                                    content="JOIN COMMUNITY"
                                    link="https://t.me/playuranus"
                                ></SocialButton>
                                <SocialButton
                                    label="telegram"
                                    content="JOIN CHANNEL"
                                    link="https://t.me/play_uranus"
                                ></SocialButton>
                            </div>
                        </div>
                    </div>
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

export default Friends;
