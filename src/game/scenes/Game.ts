/* eslint-disable @typescript-eslint/no-unused-vars */
import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    uranus: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    ground: Phaser.Physics.Arcade.StaticGroup;
    meteo: Phaser.Physics.Arcade.StaticGroup;
    meteos: Phaser.Physics.Arcade.Group;
    gameOver = false;
    meteoSpeedBase: number;
    meteoSpawnInterval: number;
    energyText: Phaser.GameObjects.Text;
    energy: Phaser.GameObjects.Image;
    energyCount = 100;
    scoreText: Phaser.GameObjects.Text;
    score = 0;
    highScore = 1200;

    constructor() {
        super("Game");
    }

    create() {
        this.gameOver = false;
        this.score = 0;
        this.meteoSpawnInterval = 1500;
        this.meteoSpeedBase = 200;

        //set background Iamge

        //setup ground
        this.background = this.add.image(512,300,"background");

        this.ground = this.physics.add.staticGroup();
        this.ground.create(196.5, 800, "ground").setScale(1).refreshBody();

        //setup main character
        this.uranus = this.physics.add.sprite(80, 300, "uranus");
        this.uranus.setCollideWorldBounds(true);
        this.uranus.setGravity(0, 500);
        this.input.on("pointerdown", () => this.jump());

        // Inside create() method for uranus
        this.uranus.setInteractive(
            new Phaser.Geom.Circle(
                this.uranus.width / 2,
                this.uranus.height / 2,
                this.uranus.width / 2
            ),
            Phaser.Geom.Circle.Contains
        );
        this.uranus.body.setCircle(this.uranus.width / 2);
        this.uranus.body.setOffset(
            -this.uranus.width / 4,
            -this.uranus.height / 4
        ); // Centering the circular body

        //display score according to time
        this.scoreText = this.add.text(196, 120, "0", {
            fontFamily: "ArcadeClassic",
            fontSize: "64px",
            color: "#fff",
        }).setOrigin(0.5);

        //display remaining energy
        this.energy = this.add.image(300, 30, "energy");
        this.energyText = this.add.text(320, 20, `${this.energyCount}`, {
            fontFamily: "ArcadeClassic",
            fontSize: "24px",
            color: "#fff",
        });

        //add randomly appearing meteos
        this.meteos = this.physics.add.group();

        this.time.addEvent({
            delay: this.meteoSpawnInterval,
            callback: this.addMeteo,
            callbackScope: this,
            loop: true,
        });

        //add collider event to ground and meteos
        this.physics.add.collider(
            this.uranus,
            this.meteos,
            this.gameOverHandler,
            undefined,
            this
        );

        this.physics.add.collider(
            this.uranus,
            this.ground,
            this.gameOverHandler,
            undefined,
            this
        );

        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        this.gameOver = false;
        this.score = 0;
        this.scene.start("Game");
    }

    //display change per frame
    update() {
        if (this.gameOver) return;

        //Increase score over time
        this.score++;
        this.scoreText.setText(
            `${Phaser.Math.FloorTo(this.score / 30)}`
        );
    }

    //uranus jump function on mouse click
    jump() {
        this.uranus.setVelocityY(-250);
    }

    //adding random meteos
    addMeteo() {
        if (this.gameOver) return;
        const meteoType = Phaser.Math.Between(1, 3);
        const meteo = this.meteos.create(
            900,
            Phaser.Math.Between(150, 650),
            `meteo${meteoType}`
        );

        //
        meteo.body.setCircle(meteo.width / 2);
        meteo.body.setOffset(-meteo.width / 4, -meteo.height / 4); // Centering the circular body
        meteo.setInteractive(
            new Phaser.Geom.Circle(
                meteo.width / 2,
                meteo.height / 2,
                meteo.width / 2
            ),
            Phaser.Geom.Circle.Contains
        );
        const meteoSpacing = 300;
        const lastMeteo = this.meteos.getLast(true);
        const startX = lastMeteo ? lastMeteo.x + meteoSpacing : 800;
        meteo.setVelocityX(-200 - this.score * 0.4);

        meteo.checkWorldBounds = true;
        meteo.outOfBoundsKill = true;
    }

    //game over function
    gameOverHandler() {
        this.gameOver = true;
        this.uranus.setTint(0xff0000);
        this.physics.pause();

        //when uranus die, decrease energy by 1
        this.energyCount--;
        console.log("energy", this.energyCount);
        this.energyText.setText(`${this.energyCount}`);

        this.add.text(196, 240, "HIGH SCORE", {
            fontFamily: "ArcadeClassic",
            fontSize: "36px",
            color: "#fff",
        }).setOrigin(0.5);
        this.add.text(196, 320, `${this.highScore}`, {
            fontFamily: "ArcadeClassic",
            fontSize: "48px",
            color: "#fff",
        }).setOrigin(0.5);

        //display restart button
        const buttonWidth = 200;
        const buttonHeight = 50;
        const buttonRadius = 10;

        const restartButtonBg = this.add.graphics();
        restartButtonBg.fillStyle(0xffffff, 1);
        restartButtonBg.fillRoundedRect(
            196 - buttonWidth / 2,
            450 - buttonHeight / 2,
            buttonWidth,
            buttonHeight,
            buttonRadius
        );

        // Create the restart text on top of the button
        const restartButtonText = this.add
            .text(196, 450, "RESTART", {
                fontSize: "36px",
                color: "#000",
                fontFamily: "ArcadeClassic",
            })
            .setOrigin(0.5); // Center the text

        // Make the button interactive
        restartButtonBg.setInteractive(
            new Phaser.Geom.Rectangle(
                196 - buttonWidth / 2,
                450 - buttonHeight / 2,
                buttonWidth,
                buttonHeight
            ),
            Phaser.Geom.Rectangle.Contains
        );
        restartButtonBg.on("pointerdown", () => {
            this.scene.restart(); // Restart the scene
            this.gameOver = false;
            this.score = 0;
        EventBus.emit("game-play");

        });

        // Optional: Add hover effect
        restartButtonBg.on("pointerover", () => {
            restartButtonBg.clear();
            restartButtonBg.fillStyle(0x888888, 1); // Darker color on hover
            restartButtonBg.fillRoundedRect(
                196 - buttonWidth / 2,
                450 - buttonHeight / 2,
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
                450 - buttonHeight / 2,
                buttonWidth,
                buttonHeight,
                buttonRadius
            );
        });

        EventBus.emit("game-over", { score: this.score });
    }
}

