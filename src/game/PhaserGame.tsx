import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import StartGame from "./main";
import { EventBus } from "./EventBus";
import { useUser } from "../hook/useUser";

export interface IRefPhaserGame {
    game: Phaser.Game | null;
    scene: Phaser.Scene | null;
}

interface IProps {
    currentActiveScene?: (scene_instance: Phaser.Scene) => void;
}

export const PhaserGame = forwardRef<IRefPhaserGame, IProps>(
    function PhaserGame({ currentActiveScene }, ref) {
        const game = useRef<Phaser.Game | null>(null!);
        const user = useUser();

        const userId = user?.userId;
        useLayoutEffect(() => {
            // Initialize game if it doesn't already exist
            if (game.current === null) {
                game.current = StartGame("game-container");

                // Attach ref
                if (typeof ref === "function") {
                    ref({ game: game.current, scene: null });
                } else if (ref) {
                    ref.current = { game: game.current, scene: null };
                }
            }

            // Handle resize function
            const resizeGame = () => {
                if (game.current) {
                    const parentElement =
                        document.getElementById("game-container");
                    const width = parentElement?.clientWidth;
                    const height = parentElement?.clientHeight;

                    if (width && height) {
                        game.current.scale.resize(width, height);
                    }
                }
            };

            // Attach resize event listener
            window.addEventListener("resize", resizeGame);

            // Initial resize in case the parent container is resized after mount
            resizeGame();

            // Clean up
            return () => {
                window.removeEventListener("resize", resizeGame);
                if (game.current) {
                    game.current.destroy(true);
                    game.current = null;
                }
            };
        }, [ref]);

        useEffect(() => {
            if (userId) {
                // Emit the user data to be received by Phaser scenes
                EventBus.emit("user-data-ready", userId);
            }
            EventBus.on(
                "current-scene-ready",
                (scene_instance: Phaser.Scene) => {
                    if (
                        currentActiveScene &&
                        typeof currentActiveScene === "function"
                    ) {
                        currentActiveScene(scene_instance);
                    }

                    if (typeof ref === "function") {
                        ref({ game: game.current, scene: scene_instance });
                    } else if (ref) {
                        ref.current = {
                            game: game.current,
                            scene: scene_instance,
                        };
                    }
                }
            );

            return () => {
                EventBus.removeListener("current-scene-ready");
            };
        }, [currentActiveScene, ref]);

        return (
            <div className="phaser-container">
                <div id="game-container" className="phaser-game"></div>
            </div>
        );
    }
);

