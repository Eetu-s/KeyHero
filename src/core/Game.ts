export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private lastTime: number = 0;

  constructor(canvasId: string) {

    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const context = this.canvas.getContext('2d');

    if (!context) {
      throw new Error('Could not get 2D context');
    }
    this.ctx = context;


    this.resize();
    window.addEventListener('resize', () => this.resize());


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
    // Logic will go here later
  }


  private draw(): void {

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = '#4488ff';
    this.ctx.fillRect(100, 100, 50, 50);
  }
}