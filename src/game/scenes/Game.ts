/* eslint-disable @typescript-eslint/no-unused-vars */
import { getGameData } from "../../lib/api";
import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    uranus: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    ground: Phaser.Physics.Arcade.StaticGroup;
    flames: Phaser.Physics.Arcade.Group;
    meteos: Phaser.Physics.Arcade.Group;
    ring: Phaser.Physics.Arcade.Group;
    meteoSpeedBase: number;
    meteoSpawnInterval: number;
    ringSpeedBase: number;
    ringSpawnInterval: number;
    flameSpeedBase: number;
    flameSpawnInterval: number;
    boostingButton: Phaser.GameObjects.Graphics;
    boostingButtonText: Phaser.GameObjects.Text;
    boostTimer: Phaser.Time.TimerEvent;
    energyText: Phaser.GameObjects.Text;
    energy: Phaser.GameObjects.Image;
    energyCount = 100;
    scoreText: Phaser.GameObjects.Text;
    score = 0;
    highScore = 0;
    gameOver = false;
    boostingActive = false;
    meteoCollider: Phaser.Physics.Arcade.Collider;
    ringCollider: Phaser.Physics.Arcade.Collider;
    flameCollider: Phaser.Physics.Arcade.Collider;

    constructor() {
        super("Game");
    }

    create() {
        const centerY = this.scale.gameSize.height / 2;
        const centerX = this.scale.gameSize.width / 2;
        EventBus.on("user-data-ready", async (userId: string | undefined) => {
            const data = await getGameData(userId);
            if (data) {
                this.energyCount = data.energy;
            }
        });
        this.gameOver = false;
        this.score = 0;
        this.meteoSpawnInterval = 1500;
        this.meteoSpeedBase = 200;
        this.flameSpawnInterval = 7500;
        this.flameSpeedBase = 300;
        this.ringSpawnInterval = 25000;
        this.ringSpeedBase = 300;
        //set background Iamge

        //setup ground
        this.background = this.add.image(512, 300, "background");

        this.ground = this.physics.add.staticGroup();
        this.ground.create(centerX, centerY * 2 - 50, "ground").refreshBody();

        //setup main character
        this.uranus = this.physics.add.sprite(80, 300, "uranus");
        this.uranus.setCollideWorldBounds(true);
        this.uranus.setGravity(0, 750);
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
        this.scoreText = this.add
            .text(196, 120, "0", {
                fontFamily: "ArcadeClassic",
                fontSize: "64px",
                color: "#fff",
            })
            .setOrigin(0.5);

        //display remaining energy
        this.energy = this.add.image(300, 30, "energy");
        this.energyText = this.add.text(320, 20, `${this.energyCount}`, {
            fontFamily: "ArcadeClassic",
            fontSize: "24px",
            color: "#fff",
        });

        //add randomly appearing meteos
        this.meteos = this.physics.add.group();
        this.flames = this.physics.add.group();
        this.ring = this.physics.add.group();

        this.time.addEvent({
            delay: this.meteoSpawnInterval,
            callback: this.addMeteo,
            callbackScope: this,
            loop: true,
        });

        this.time.addEvent({
            delay: this.flameSpawnInterval,
            callback: this.addFlame,
            callbackScope: this,
            loop: true,
        });

        this.time.addEvent({
            delay: this.ringSpawnInterval,
            callback: this.addRing,
            callbackScope: this,
            loop: true,
        });

        //add collider event to ground and meteos
        this.meteoCollider = this.physics.add.collider(
            this.uranus,
            this.meteos,
            this.gameOverHandler,
            undefined,
            this
        );
        this.flameCollider = this.physics.add.collider(
            this.uranus,
            this.flames,
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

        this.ringCollider = this.physics.add.overlap(
            this.uranus,
            this.ring,
            this.collectRing,
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
        this.scoreText.setText(`${Phaser.Math.FloorTo(this.score / 30)}`);
    }

    //uranus jump function on mouse click
    jump() {
        this.uranus.setVelocityY(-250);
    }
    collectRing(uranus: Phaser.Physics.Arcade.Sprite, ring: Phaser.Physics.Arcade.Sprite) {
        
    
        // Destroy the ring
        ring.disableBody(true, true);
        console.log("I eat a ring!!");
        // Show the Boosting button
       
            this.createBoostingButton();
            console.log("createBoosting Button created");
       
            this.boostingButton.setVisible(true);
            this.boostingButtonText.setVisible(true);
            
        
   
       
        
    }
    
    createBoostingButton() {
        const buttonWidth = 200;
        const buttonHeight = 50;
        const buttonRadius = 10;
        const centerX = this.scale.gameSize.width / 2;

        // Button background
        this.boostingButton = this.add.graphics();
        this.boostingButton.fillStyle(0xffffff, 1); // Green button
        this.boostingButton.fillRoundedRect(
            centerX - buttonWidth / 2,
            this.scale.gameSize.height - 75,
            buttonWidth,
            buttonHeight,
            buttonRadius
        );

        // Button text
        this.boostingButtonText = this.add
            .text(centerX, this.scale.gameSize.height - 50, "BOOSTING", {
                fontSize: "24px",
                color: "#000",
                fontFamily: "ArcadeClassic",
            })
            .setOrigin(0.5);

        // Make the button interactive
        this.boostingButton.setInteractive(
            new Phaser.Geom.Rectangle(
                centerX - buttonWidth / 2,
                this.scale.gameSize.height - 75,
                buttonWidth,
                buttonHeight
            ),
            Phaser.Geom.Rectangle.Contains
        );

        // Handle button click
        this.boostingButton.on("pointerdown", this.activateBoosting, this);

        // Initially hide the button
        this.boostingButton.setVisible(true);
        this.boostingButtonText.setVisible(true);
    }

    activateBoosting() {
        // Hide the Boosting button
        this.boostingButton.setVisible(false);
        this.boostingButtonText.setVisible(false);

        // Make uranus invincible
        this.boostingActive = true;
        this.uranus.setTexture("ringUranus");
        this.uranus.setScale(83/189, 81/189);
        this.uranus.clearTint(); // Clear any tint applied during Game Over
        this.meteoCollider.active = false;
        this.flameCollider.active = false;
        this.ringCollider.active = false;
        // Set a timer to disable invincibility after 30 seconds
        this.boostTimer = this.time.addEvent({
            delay: 3000, // 30 seconds
            callback: this.deactivateBoosting,
            callbackScope: this,
        });
    }

    deactivateBoosting() {
        this.boostingActive = false;
        this.uranus.setTexture("uranus");
        this.uranus.setScale(1,1); // Replace with your normal image key
        this.meteoCollider.active = true;
        this.flameCollider.active = true;
        this.ringCollider.active = true;
    }
    //adding random meteos
    addMeteo() {
        if (this.gameOver) return;
        const meteoType = Phaser.Math.Between(1, 3);
        const meteo = this.meteos.create(
            900,
            Phaser.Math.Between(150, 550),
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
        meteo.setVelocityX(-200 - this.score * 0.05);

        meteo.checkWorldBounds = true;
        meteo.outOfBoundsKill = true;
    }
    addFlame() {
        if (this.gameOver) return;
        const flameType = Phaser.Math.Between(1, 5);
        const flame = this.flames.create(
            900,
            Phaser.Math.Between(150, 550),
            `flame${flameType}`
        );

        flame.setScale(0.2, 0.2); // Scale down to 50% of its original size
        // Alternatively, use different values for width and height:
        // flame.setScale(0.5, 0.8); // Width scaled to 50%, height to 80%

        // Adjust the physics body size to match the scaled sprite
        flame.body.setSize(
            flame.width * flame.scaleX,
            flame.height * flame.scaleY
        );
        flame.body.setSize(flame.width, flame.height / 2); // Width and height for the ellipse
        flame.body.setOffset(-flame.width / 2, -flame.height / 4); // Adjust offset to center the body

        // Making the flame interactive with an ellipse
        flame.setInteractive(
            new Phaser.Geom.Ellipse(
                flame.width / 2, // Center X of the ellipse
                flame.height / 2, // Center Y of the ellipse
                flame.width, // Width of the ellipse
                flame.height / 2 // Height of the ellipse
            ),
            Phaser.Geom.Ellipse.Contains
        );
        const flameSpacing = 300;
        const lastflame = this.flames.getLast(true);
        const startX = lastflame ? lastflame.x + flameSpacing : 800;
        flame.setVelocityX(-300 - this.score * 0.05);

        flame.checkWorldBounds = true;
        flame.outOfBoundsKill = true;
    }

    addRing() {
        if (this.gameOver) return;

        // Create the ring
        const ring = this.ring.create(
            900,
            Phaser.Math.Between(150, 550), // Random vertical position
            "ring" // Single ring type
        );

        // Set the circular physics body
        ring.body.setCircle(ring.width / 2);
        ring.body.setOffset(-ring.width / 4, -ring.height / 4); // Center the body

        // Make the ring interactive with a circular hit area
        ring.setInteractive(
            new Phaser.Geom.Circle(
                ring.width / 2, // Center X
                ring.height / 2, // Center Y
                ring.width / 2 // Radius
            ),
            Phaser.Geom.Circle.Contains
        );

        // Set the horizontal velocity for the ring
        ring.setVelocityX(-250 - this.score * 0.05);

        // Remove the ring when it goes out of bounds
        ring.checkWorldBounds = true;
        ring.outOfBoundsKill = true;
    }

    //game over function
    gameOverHandler() {
        if (this.boostingActive) {
            // Ignore collision if boosting is active
            return;
        }
        this.gameOver = true;
        this.uranus.setTint(0xff0000);
        this.physics.pause();

        //when uranus die, decrease energy by 1
        EventBus.on("user-data-ready", async (userId: string | undefined) => {
            const data = await getGameData(userId);
            if (data) {
                this.energyCount = data.energy;
                this.highScore = data.topScore;
            }
        });
        this.energyText.setText(`${this.energyCount}`);

        this.add
            .text(196, 240, "HIGH SCORE", {
                fontFamily: "ArcadeClassic",
                fontSize: "36px",
                color: "#fff",
            })
            .setOrigin(0.5);
        this.add
            .text(196, 320, `${this.highScore}`, {
                fontFamily: "ArcadeClassic",
                fontSize: "48px",
                color: "#fff",
            })
            .setOrigin(0.5);

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

