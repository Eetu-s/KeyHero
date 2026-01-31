import { GAME_CONFIG } from '../core/constants.js';

export class VirtualKeyboard {
  private canvasWidth: number;
  private canvasHeight: number;
  private keyMap: Map<string, number> = new Map(); // Stores X position for each char

 constructor(width: number, height: number) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.initializeKeyMap();
  }

  private initializeKeyMap(): void {
    const qwertyLayout = GAME_CONFIG.QWERTY_LAYOUT;
    this.keyMap.clear();
    for (const char of qwertyLayout) {
      const xPos = this.getQWERTYXPosition(char, this.canvasWidth);
      this.keyMap.set(char, xPos);
    }
  }

  public getQWERTYXPosition(char: string, canvasWidth: number): number {

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

public draw(ctx: CanvasRenderingContext2D): void {

    const keySize = GAME_CONFIG.KEY_SPACING ; 
    const startY = this.canvasHeight - GAME_CONFIG.KEY_BOARD_Y_OFFSET; 

this.keyMap.forEach((x, char) => {
      
      const index = GAME_CONFIG.QWERTY_LAYOUT.indexOf(char);
      let row = 0;
      
      if (index >= GAME_CONFIG.INDEX_OF_LINE3_START) {
        row = 2; 
      } else if (index >= GAME_CONFIG.INDEX_OF_LINE2_START) {
        row = 1; 
      }
      
      const y = startY + (row * GAME_CONFIG.KEY_SPACING);
      
      ctx.strokeStyle = '#444'; 
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, keySize, keySize);

      ctx.fillStyle = '#666';
      ctx.font = 'bold 24px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      ctx.fillText(char, x + (keySize / 2), y + (keySize / 2));
    });
  }

  public checkYWithinKey(y: number, key: string): boolean {

      const index = GAME_CONFIG.QWERTY_LAYOUT.indexOf(key);
      let row = 0;
      if (index >= GAME_CONFIG.INDEX_OF_LINE3_START) {
        row = 2; 
      } else if (index >= GAME_CONFIG.INDEX_OF_LINE2_START) {
        row = 1; 
      }
      

    const startY = this.canvasHeight - GAME_CONFIG.KEY_BOARD_Y_OFFSET; 
    const keyTop = startY + (row * GAME_CONFIG.KEY_SPACING);
    const keyBottom = keyTop + GAME_CONFIG.KEY_SPACING;

    return y >= keyTop && y <= keyBottom;
  }


}
