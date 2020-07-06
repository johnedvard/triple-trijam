import { Game } from './game';
import { Color, EngineOptions, Physics } from 'excalibur';
const config: EngineOptions = {
  width: 512,
  height: 512,
  backgroundColor: Color.White,
};
Physics.enabled = true;
new Game(config).start();
