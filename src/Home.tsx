/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { IRefPhaserGame, PhaserGame } from "./game/PhaserGame";
import { MainMenu } from "./game/scenes/MainMenu";
import { EventBus } from "./game/EventBus";
import { useNavigate } from 'react-router-dom';

type GameOverEvent = {
    score: number;
};

function Home() {
    const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  }  
  const goToLeaderboard = () => {
    navigate('/leaderboard');
  };
  const goToFriends = () => {
    navigate('/friends');
  };
    // The sprite can only be moved in the MainMenu Scene
    const [canMoveSprite, setCanMoveSprite] = useState(true);
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    const changeScene = () => {
        if (phaserRef.current) {
            console.log(phaserRef.current, "current scene");
            const scene = phaserRef.current.scene as MainMenu;

            if (scene) {
                scene.scene.start("MainMenu");
            }
        }
    };

    // Event emitted from the PhaserGame component
    const currentScene = (scene: Phaser.Scene) => {
        setCanMoveSprite(scene.scene.key !== "MainMenu");
    };
    console.log(phaserRef.current, "current scene2");

    useEffect(() => {
        const handleGameOver = ({ score }: GameOverEvent) => {
            setIsGameOver(true);
            setScore(score);
        };
        EventBus.on("game-over", handleGameOver);
        EventBus.on("game-play", ()=> {setIsGameOver(false)})

        // Clean up on unmount
        return () => {
            EventBus.off("game-over", handleGameOver);
        };
    }, []);
    return (
        <div
            id="home"
            className="w-full max-w-sm h-full bg-white relative font-['ArcadeClassic'] bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/background.jpeg')" }}
        >
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />

            <div
                className={`absolute w-full bottom-2 left-0 ${
                    phaserRef.current?.scene?.scene.key == "MainMenu" || isGameOver == true
                        ? "flex"
                        : "hidden"
                } justify-between p-4 gap-1`}
            >
                <button
                    onClick={changeScene}
                    className="bg-white hover:bg-slate-500 active:bg-white text-black font-bold py-2 px-4 rounded-lg shadow-md font-['ArcadeClassic']"
                >
                    PLAY
                </button>
                <button onClick={goToLeaderboard} className="bg-white hover:bg-slate-500 active:bg-white  text-black font-bold py-2 px-4 rounded-lg shadow-md font-['ArcadeClassic']">
                    LEADERBOARD
                </button>
                <button onClick={goToFriends} className="bg-white hover:bg-slate-500 active:bg-white text-black font-bold py-2 px-4 rounded-lg shadow-md font-['ArcadeClassic']">
                    FRIENDS
                </button>
            </div>
        </div>
    );
}

export default Home;

