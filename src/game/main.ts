import { Boot } from "./scenes/Boot";
import { Game as MainGame } from "./scenes/Game";
import { MainMenu } from "./scenes/MainMenu";
import { AUTO, Game } from "phaser";
import { Preloader } from "./scenes/Preloader";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,

    parent: "game-container",
    backgroundColor: "#000000",
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                x: 0,
                y: 0,
            }, // No gravity
            debug: false, // Enable for debugging
        },
    },
    scale: {
        mode: Phaser.Scale.FIT, // Scale to fit the screen while maintaining aspect ratio
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
        width: window.innerWidth, // Calculate width based on screen height
        height: window.innerHeight, // Set initial height as screen height
    },
    scene: [Boot, Preloader, MainMenu, MainGame],
};

const StartGame = (parent: string) => {
    const parentElement = document.getElementById(parent);

    // Use parent's dimensions, defaulting to config if unavailable
    const width = parentElement?.clientWidth || config.width;
    const height = parentElement?.clientHeight || config.height;

    console.log("ratio:", config.scale?.mode);
    return new Game({ ...config, parent, width, height });
};

export default StartGame;

