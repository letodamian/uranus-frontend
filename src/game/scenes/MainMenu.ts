/* eslint-disable @typescript-eslint/no-unused-vars */
import { GameObjects, Scene } from "phaser";
import { EventBus } from "../EventBus";

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

    logoTween: Phaser.Tweens.Tween | null;

    constructor() {
        super("MainMenu");
    }

    create() {

        this.logo = this.add.image(196, 150, "logo").setDepth(100);
        this.ringUranus = this.add.image(196, 500, "ring").setDepth(100);
        this.ground = this.add.image(196, 800, "ground").setDepth(100);

        this.title = this.add
            .text(196, 280, "TOP SCORE", {
                fontFamily: "ArcadeClassic",
                fontSize: 24,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100);

        this.score = this.add
            .text(196, 330, "1200", {
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
            196 - buttonWidth / 2,
            650 - buttonHeight / 2,
            buttonWidth,
            buttonHeight,
            buttonRadius
        );

        // Create the restart text on top of the button
        const restartButtonText = this.add
            .text(196, 650, "START", {
                fontSize: "36px",
                color: "#000",
                fontFamily: "ArcadeClassic",
            })
            .setOrigin(0.5); // Center the text

        // Make the button interactive
        restartButtonBg.setInteractive(
            new Phaser.Geom.Rectangle(
                196 - buttonWidth / 2,
                650 - buttonHeight / 2,
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
                196 - buttonWidth / 2,
                650 - buttonHeight / 2,
                buttonWidth,
                buttonHeight,
                buttonRadius
            );
        });
        restartButtonBg.on("pointerout", () => {
            restartButtonBg.clear();
            restartButtonBg.fillStyle(0xffffff, 1); // Original color
            restartButtonBg.fillRoundedRect(
                196 - buttonWidth / 2,
                650 - buttonHeight / 2,
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

