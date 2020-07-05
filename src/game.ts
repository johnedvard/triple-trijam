import { Engine, EngineOptions, Input, Color } from 'excalibur';
import { Player } from './player';
export class Game extends Engine {
  constructor(options?: EngineOptions) {
    super(options);
    this.add(new Player(206, 206, Input.Keys.A, Input.Keys.D, Color.Green));
    this.add(new Player(226, 206, Input.Keys.J, Input.Keys.L, Color.Blue));
  }
}
