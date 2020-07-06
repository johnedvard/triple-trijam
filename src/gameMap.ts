import { Actor, ActorArgs, PreCollisionEvent, Vector, Engine } from 'excalibur';
import { Player } from './player';
export class GameMap extends Actor {
  constructor(config: ActorArgs, engine: Engine) {
    super(config);
    const wall1 = new Actor({
      x: 32,
      y: 12,
      width: 448,
      height: 20,
      ...config,
    });
    const wall2 = new Actor({
      x: 12,
      y: 12,
      width: 20,
      height: 468,
      ...config,
    });
    const wall3 = new Actor({
      x: 480,
      y: 12,
      width: 20,
      height: 468,
      ...config,
    });
    const wall4 = new Actor({
      x: 12,
      y: 480,
      width: 488,
      height: 20,
      ...config,
    });
    const wall5 = new Actor({
      x: 82,
      y: 72,
      width: 350,
      height: 20,
      ...config,
    });
    const wall6 = new Actor({
      x: 82,
      y: 92,
      width: 20,
      height: 330,
      ...config,
    });
    const wall7 = new Actor({
      x: 412,
      y: 92,
      width: 20,
      height: 330,
      ...config,
    });
    const wall8 = new Actor({
      x: 102,
      y: 402,
      width: 310,
      height: 20,
      ...config,
    });

    engine.add(wall1);
    engine.add(wall2);
    engine.add(wall3);
    engine.add(wall4);
    engine.add(wall5);
    engine.add(wall6);
    engine.add(wall7);
    engine.add(wall8);
    wall1.on('precollision', (args) => this.postCollission(args, Vector.Down));
    wall3.on('precollision', (args) => this.postCollission(args, Vector.Left));
    wall2.on('precollision', (args) => this.postCollission(args, Vector.Right));
    wall4.on('precollision', (args) => this.postCollission(args, Vector.Up));
    wall5.on('precollision', (args) => this.postCollission(args, Vector.Up));
    wall6.on('precollision', (args) => this.postCollission(args, Vector.Right));
    wall7.on('precollision', (args) => this.postCollission(args, Vector.Left));
    wall8.on('precollision', (args) => this.postCollission(args, Vector.Down));
  }
  private postCollission = (args: PreCollisionEvent, normaVector: Vector) => {
    console.log('collision');
    if (args && args.other && args.other instanceof Player) {
      args.other.vel = args.other.vel
        .sub(normaVector.scale(2 * args.other.vel.dot(normaVector)))
        .normalize();
      args.other.rotation = args.other.rotation * 2;
    }
  };
}
