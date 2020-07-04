import * as Phaser from "phaser";
export class Game extends Phaser.Game {
  constructor(config: any) {
    super(config);
    config.scene.preload = this.preload;
    config.scene.create = this.create;
    config.scene.update = this.update;
  }
  preload = () => {
    console.log("my own preload");
  };

  create = () => {
    console.log("my own create");
  };

  update = () => {
    console.log("my own update");
  };
}
