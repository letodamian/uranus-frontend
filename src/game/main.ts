import { Boot } from "./scenes/Boot";
import { Game as MainGame } from "./scenes/Game";
import { MainMenu } from "./scenes/MainMenu";
import { AUTO, Game } from "phaser";
import { Preloader } from "./scenes/Preloader";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 393,
    height: 852,
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
    scene: [Boot, Preloader, MainMenu, MainGame],
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
};

export default StartGame;

