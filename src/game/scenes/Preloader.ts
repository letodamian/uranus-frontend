import { Scene } from "phaser";

export class Preloader extends Scene {
    constructor() {
        super("Preloader");
    }

    init() {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(196.5, 384, "background");

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(196.5, 384, 468, 32).setStrokeStyle(1, 0xff00ff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(196.5 - 230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on("progress", (progress: number) => {
            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + 290 * progress;
        });
    }

    preload() {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath("assets");

        this.load.image("logo", "title.png");
        this.load.image("ring", "ring.png")
        this.load.image("uranus", "uranus.png");
        this.load.image("meteo1", "meteo1.png");
        this.load.image("meteo2", "meteo2.png");
        this.load.image("meteo3", "meteo3.png");
        this.load.image("ground", "ground.png");
        this.load.image("flame1", "flame1.png");
        this.load.image("flame2", "flame2.png");
        this.load.image("flame3", "flame3.png");
        this.load.image("flame4", "flame4.png");
        this.load.image("flame5", "flame5.png");
        this.load.image("energy", "energy.png")

        console.log("successfully load")
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start("MainMenu");
    }
}

