import {
  Actor,
  CollisionType,
  Input,
  Vector,
  Engine,
  Color,
  PreCollisionEvent,
} from 'excalibur';
import { GameMap } from './gameMap';
export class Player extends Actor {
  isDrawCircle = false;
  isDrawArrow = false;
  isChangingDirection = false; // Inidicates whether we are planning the next direction or not.
  rotateRadians = 0; // used to rotate the velocity vector
  orientation = new Vector(0, 1);
  speed = 2;
  pointer: Actor;
  leftKey: Input.Keys;
  rightKey: Input.Keys;
  accel = 0.02;
  constructor(
    x: number,
    y: number,
    leftKey: Input.Keys,
    rightKey: Input.Keys,
    color: Color
  ) {
    super({
      x: x,
      y: y,
      width: 10,
      height: 10,
      color: color,
      vel: new Vector(1, 0),
    });
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    this.body.collider.type = CollisionType.Active;
    this.pointer = new Actor({
      x: this.pos.x,
      y: this.pos.y,
      width: 5,
      height: 20,
      color: this.color,
    });
    this.on('precollision', this.postCollission);
  }

  private postCollission = (args: PreCollisionEvent) => {
    if (args && args.other instanceof Player) {
      this.vel = new Vector(this.vel.x * -1, this.vel.y * -1);
      this.rotation = this.rotation + 3.14;
    }
  };

  public update(engine: Engine, dt: number) {
    if (
      engine.input.keyboard.isHeld(this.leftKey) ||
      engine.input.keyboard.isHeld(this.rightKey)
    ) {
      this.isChangingDirection = true;
      this.startDirectionRotation(
        dt,
        engine.input.keyboard.isHeld(this.leftKey)
      );
      this.vel = this.vel.normalize();
    } else {
      if (this.isChangingDirection) {
        this.vel = this.vel.rotate(this.rotateRadians);
        this.rotateRadians = 0;
        this.rotation = this.vel.toAngle();
      }
      this.isChangingDirection = false;
      this.pos = this.pos.add(this.vel.scale(this.speed));
    }
  }
  startDirectionRotation(dt: number, isLeft = true) {
    // create a circle around the player
    this.isDrawCircle = true;
    // rotate an arrow, pivot from pkayer,
    this.isDrawArrow = true;
    // get the directional vector, and send player with (acceleration and) speed in the vector direction
    this.rotateDirection(dt, isLeft ? 1 : -1);
    if (this.pointer) {
      this.pointer.pos = this.pos.clone();
    }
  }

  rotateDirection(dt: number, multiplier = 1) {
    this.rotateRadians += 0.05 * multiplier;
    this.rotation += 0.05 * multiplier;
    if (this.rotateRadians > 6.28) {
      this.rotateRadians = 0;
    } else if (this.rotateRadians < -6.28) {
      this.rotateRadians = 0;
    }
    if (this.rotation > 6.28) {
      this.rotation = 0;
    } else if (this.rotation < -6.28) {
      this.rotation = 0;
    }
  }
}
