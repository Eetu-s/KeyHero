import { Note } from '../entities/Note';
import { GAME_CONFIG } from './constants';

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private lastTime: number = GAME_CONFIG.SPAWN_INTERVAL;

  // Game State
  private notes: Note[] = []; 
  private spawnTimer: number = 0;
  private spawnInterval: number = GAME_CONFIG.SPAWN_INTERVAL; 

  constructor(canvasId: string) {

    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const context = this.canvas.getContext('2d');

    if (!context) {
      throw new Error('Could not get 2D context');
    }
    this.ctx = context;


    this.resize();
    window.addEventListener('resize', () => this.resize());

    window.addEventListener('keydown', (e) => this.handleInput(e));

    requestAnimationFrame((timestamp) => this.loop(timestamp));
  }

  private resize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }


  private loop(timestamp: number): void {

    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.update(deltaTime);
    this.draw();

    requestAnimationFrame((t) => this.loop(t));
  }


  private update(deltaTime: number): void {
    this.spawnTimer += deltaTime;
    //spawn new note if time exceeded
    if (this.spawnTimer > this.spawnInterval) {
      this.spawnTimer = 0;
      //random x position and character
        this.spawnNote();
    }

    //update notes and remove off-screen ones
    this.notes.forEach((note) => note.update(deltaTime));
    this.notes = this.notes.filter((note) => note.y <= this.canvas.height);
  }


  private draw(): void {


    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.notes.forEach((note) => note.draw(this.ctx));
  }


private spawnNote(): void {

    // Random character
    const chars = GAME_CONFIG.WORD_LIST;
    const char = chars.charAt(Math.floor(Math.random() * chars.length));

    //const padding = GAME_CONFIG.PADDING;
    const x = this.getQWERTYPosition(char, this.canvas.width);
    
    const y = GAME_CONFIG.SPAWN_Y; 
    

    
    // Speed: 0.2 pixels per ms
    this.notes.push(new Note(x, y, char, GAME_CONFIG.BASE_SPEED)); 
  }

private getQWERTYPosition(char: string, canvasWidth: number): number {

    const indexOfLine2Start = GAME_CONFIG.INDEX_OF_LINE2_START;
    const indexOfLine3Start = GAME_CONFIG.INDEX_OF_LINE3_START;

    const keyWidth = GAME_CONFIG.KEY_SPACING; 
    const startX = GAME_CONFIG.PADDING 

    let index = GAME_CONFIG.QWERTY_LAYOUT.indexOf(char);

    if (index < 0) return -100; // Not found move this off-screen
    if (index < indexOfLine2Start) { return startX + index * keyWidth }
    else if (index < indexOfLine3Start) { return startX + ((index - indexOfLine2Start) * keyWidth) + GAME_CONFIG.LINE_2_OFFSET; }
    else { return startX + ((index - indexOfLine3Start) * keyWidth) + GAME_CONFIG.LINE_3_OFFSET; }
  }



  private handleInput(event: KeyboardEvent): void {
    
    const key = event.key.toUpperCase();

    //remove the first note that matches the key  (as all have constant speed for now this is sufficient)
    const index = this.notes.findIndex(note => note.char === key);

    if (index !== -1) {
      this.notes.splice(index, 1);
      console.log(`Hit: ${key}!`);
    } else {
      // maybe add some punishment for wrong key?
      console.log(`Miss: ${key}`);
    }
  }
}
