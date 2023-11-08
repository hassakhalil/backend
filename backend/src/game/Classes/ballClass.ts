import { randomInt } from "crypto";
export class ballClass {
  x: number;
  y: number;
  height: number;
  width: number;
  score: number[] = [];
  xspeed = 5;
   rad_255 = 255 * (Math.PI/180);
   rad_135 = 135 * (Math.PI/180);
   rad = 45 * (Math.PI/180);
  yspeed = 1 ;
  progress_speed = 0;
  bot_error_ratio = 0.20;
  RATE = 1000 / 60;
  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;
    this.reset();
  }
  update(gameMode ?: string) {
    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;
    // if (gameMode === 'botMode')
      // this.progress_speed += 0.005;
      this.progress_speed = 0;
      // this.RATE -= 0.5; 
    // this.progress_speed += 0.000025;
  } 
  checkLeftPaddle(paddle_x: number, paddle_y: number, paddle_h: number) {
    if ((this.y - 12 < (paddle_y + paddle_h / 2) &&
      this.y  + 12 > (paddle_y - paddle_h / 2)) && this.x - 12 < paddle_x + 5)
        if (this.x > paddle_x)
        {
          const diff = this.y - (paddle_y - paddle_h / 2);
          const angel = -this.rad + (this.rad - (-1 * this.rad) * ((diff - 0) / (paddle_h - 0)));
          this.xspeed = 6 * Math.cos(angel);
          this.yspeed = 5 * Math.sin(angel);
          this.x = paddle_x + 5 + 12;
          this.xspeed += 1.5 ;
        }
    }
        
    checkRightPaddle(paddle_x: number, paddle_y: number, paddle_h: number) {
      if ((this.y - 12 < (paddle_y + paddle_h / 2) &&
        this.y  + 12 > (paddle_y - paddle_h / 2)) && this.x + 12 > paddle_x - 5)
        if (this.x < paddle_x)    
        {
          const diff = this.y - (paddle_y - paddle_h / 2);
      
          const angel = this.rad_255 + (this.rad_135 - this.rad_255) * ((diff - 0) / (paddle_h - 0));
          this.xspeed = 6 * Math.cos(angel);
          this.yspeed = 5 * Math.sin(angel);
          this.x = paddle_x - 5 - 12;
          this.xspeed -= 1.5 ;
        }
      }
  reset = () => {
    this.x = this.width * 0.5;  
    this.y = this.height * 0.5;
    const angel =  Math.floor(Math.random() * ((Math.PI / 4)  - (-1 * Math.PI /4) + 1)) + (-1 * Math.PI /4);
    this.xspeed = 5 * Math.cos(angel);
    this.yspeed = 5 * Math.sin(angel);
    if (Math.random() < 0.5)
      this.xspeed *= -1;
  }

  edges(windowHeight: number, windowWidth: number, botMode ?: number) {
    if (this.y <= 0 + 12 || this.y >= this.height - 12)
      this.yspeed  = this.yspeed * -1;
    if (this.x - 10 >= this.width)
    {
      this.reset();
      this.score[0] += 1;
      this.progress_speed = 0;
      // this.RATE = 1000 / 60;
      // RATE = 60;
    }
    if (this.x + 10 <= 0)
    {
      this.reset();
      this.score[1] += 1;
      this.progress_speed = 0;
      // this.RATE = 1000 / 60;
    }
  }
}