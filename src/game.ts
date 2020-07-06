import {
  Engine,
  EngineOptions,
  Input,
  Color,
  Vector,
  CollisionType,
} from 'excalibur';
import { Player } from './player';
import { GameMap } from './gameMap';
export class Game extends Engine {
  constructor(options?: EngineOptions) {
    super(options);
    this.add(new Player(180, 430, Input.Keys.A, Input.Keys.D, Color.Green));
    this.add(new Player(180, 460, Input.Keys.J, Input.Keys.L, Color.Blue));
    this.add(
      new GameMap(
        {
          collisionType: CollisionType.Passive,
          color: Color.DarkGray,
          anchor: new Vector(0, 0),
        },
        this
      )
    );
  }
}
