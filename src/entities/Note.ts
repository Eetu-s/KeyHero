export class Note {
  public x: number;
  public y: number;
  public char: string;
  public isActive: boolean = true; 

  private speed: number;
  private color: string = '#e41818';

  constructor(x: number, y: number, char: string, speed: number) {
    this.x = x;
    this.y = y;
    this.char = char;
    this.speed = speed;
  }

  
  update(deltaTime: number): void {
    this.y += this.speed * deltaTime;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.font = 'bold 30px monospace';
    ctx.fillStyle = this.color;
    ctx.textAlign = 'center';
    
    ctx.fillText(this.char, this.x, this.y);
  }
}