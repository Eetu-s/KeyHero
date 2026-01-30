import './style.css'
import { Game } from './core/Game';
import { GAME_CONFIG } from './core/constants';

window.addEventListener('DOMContentLoaded', () => {
  new Game(GAME_CONFIG.CANVAS_ID);
});