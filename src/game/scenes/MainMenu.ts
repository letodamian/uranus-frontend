/* eslint-disable @typescript-eslint/no-unused-vars */
import { GameObjects, Scene } from "phaser";
import { EventBus } from "../EventBus";
import { getGameData } from "../../lib/api";

export class MainMenu extends Scene {
    background: GameObjects.Image;
    logo: GameObjects.Image;
    ringUranus: GameObjects.Image;
    ground: GameObjects.Image;
    title: GameObjects.Text;
    score: GameObjects.Text;

    energyText: Phaser.GameObjects.Text;
    energy: Phaser.GameObjects.Image;
    energyCount = 100;
    scoreCount = 0;

    logoTween: Phaser.Tweens.Tween | null;

    constructor() {
        super("MainMenu");
    }

    create() {
        EventBus.on("user-data-ready", async (userId: string | undefined) => {
            const data = await getGameData(userId);
            if (data) {
                this.energyCount = data.energy;
                this.scoreCount = data.topScore;
            }
        });
        const centerY = this.scale.gameSize.height / 2;
        const centerX = this.scale.gameSize.width / 2;
        this.background = this.add.image(512, 300, "background");
        this.logo = this.add.image(centerX, 120, "logo").setDepth(100);
        this.ringUranus = this.add
            .image(centerX, centerY + 140, "ringUranus")
            .setDepth(10);
        this.ground = this.add
            .image(centerX, centerY * 2 - 50, "ground")
            .setDepth(100);

        this.title = this.add
            .text(centerX, centerY - 145, "TOP SCORE", {
                fontFamily: "ArcadeClassic",
                fontSize: 36,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100);

        this.score = this.add
            .text(centerX, centerY - 95, `${this.scoreCount}`, {
                fontFamily: "ArcadeClassic",
                fontSize: 64,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100);

        this.energy = this.add.image(300, 30, "energy");
        this.energyText = this.add.text(320, 20, `${this.energyCount}`, {
            fontFamily: "ArcadeClassic",
            fontSize: "24px",
            color: "#fff",
        });

        const buttonWidth = 150;
        const buttonHeight = 50;
        const buttonRadius = 10;

        const restartButtonBg = this.add.graphics();
        restartButtonBg.fillStyle(0xffffff, 1);
        restartButtonBg.fillRoundedRect(
            centerX - buttonWidth / 2,
            centerY - buttonHeight / 2 ,
            buttonWidth,
            buttonHeight,
            buttonRadius
        );

        // Create the restart text on top of the button
        const restartButtonText = this.add
            .text(centerX, centerY , "START", {
                fontSize: "36px",
                color: "#000",
                fontFamily: "ArcadeClassic",
            })
            .setOrigin(0.5); // Center the text

        // Make the button interactive
        restartButtonBg.setInteractive(
            new Phaser.Geom.Rectangle(
                centerX - buttonWidth / 2,
                centerY - buttonHeight / 2 ,
                buttonWidth,
                buttonHeight
            ),
            Phaser.Geom.Rectangle.Contains
        );
        restartButtonBg.on("pointerdown", () => {
            this.changeScene();
            EventBus.emit("game-play");
        });

        // Optional: Add hover effect
        restartButtonBg.on("pointerover", () => {
            restartButtonBg.clear();
            restartButtonBg.fillStyle(0x888888, 1); // Darker color on hover
            restartButtonBg.fillRoundedRect(
                centerX - buttonWidth / 2,
                centerY - buttonHeight / 2 ,
                buttonWidth,
                buttonHeight,
                buttonRadius
            );
        });
        restartButtonBg.on("pointerout", () => {
            restartButtonBg.clear();
            restartButtonBg.fillStyle(0xffffff, 1); // Original color
            restartButtonBg.fillRoundedRect(
                centerX - buttonWidth / 2,
                centerY - buttonHeight / 2 ,
                buttonWidth,
                buttonHeight,
                buttonRadius
            );
        });
        console.log("we are at main menu");

        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        this.scene.start("Game");
    }

    moveLogo(vueCallback: ({ x, y }: { x: number; y: number }) => void) {
        if (this.logoTween) {
            if (this.logoTween.isPlaying()) {
                this.logoTween.pause();
            } else {
                this.logoTween.play();
            }
        } else {
            this.logoTween = this.tweens.add({
                targets: this.logo,
                x: { value: 750, duration: 3000, ease: "Back.easeInOut" },
                y: { value: 80, duration: 1500, ease: "Sine.easeOut" },
                yoyo: true,
                repeat: -1,
                onUpdate: () => {
                    if (vueCallback) {
                        vueCallback({
                            x: Math.floor(this.logo.x),
                            y: Math.floor(this.logo.y),
                        });
                    }
                },
            });
        }
    }
}

