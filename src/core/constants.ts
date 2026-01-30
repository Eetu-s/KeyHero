export const GAME_CONFIG = {
  // Appearance
  CANVAS_ID: 'game-canvas',
  PADDING: 50,
  NOTE_SIZE: '30px',
  NOTE_FONT: 'monospace',
  NOTE_COLOR: '#ffffff',

  // QWERTY Keyboard Layout
  QWERTY_LAYOUT: 'QWERTYUIOPASDFGHJKLZXCVBNM',
  KEY_SPACING: 80, // Space between keys in pixels
  INDEX_OF_LINE2_START: 10,
  INDEX_OF_LINE3_START: 19,
  LINE_2_OFFSET: 20,
  LINE_3_OFFSET: 40,

  SPAWN_INTERVAL: 1000,   // Milliseconds between spawns
  BASE_SPEED: 0.2,   // Pixels per millisecond
  SPAWN_Y: -30,              
  
  // Valid Characters
  WORD_LIST: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
};