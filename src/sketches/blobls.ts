import p5 from "p5";

class Blob {
  color: p5.Color;
  noisePhase: number;
  center: number[];
  alpha: number;

  public constructor(ctx: p5) {
    this.color = this.calculateRandomColor(ctx);
    this.noisePhase = ctx.random(0, 10);
    this.alpha = Math.floor(ctx.random(40, 80));
    this.center = [
      ctx.random([
        ctx.width / 6 + ctx.random(-100, 120),
        ctx.width / 1.1 + ctx.random(-100, 120),
      ]),
      ctx.height / 1.6 + ctx.random(-100, 120),
    ];
  }

  private calculateRandomColor = (ctx: p5) => {
    const red = 100 + 120 * ctx.random(0.1, 1);
    const green = ctx.random(0, 255);
    const blue = 155 + (60 * ctx.random(0.1, 1)) / ctx.windowHeight;

    const bright = [
      ctx.random(200, 250),
      ctx.random(20, 220),
      ctx.random(10, 20),
    ];

    let color = ctx.color(red, green, blue);
    // very low chance of overriding with a bright color
    if (ctx.random(100) > 95) {
      color = ctx.color(bright[0], bright[1], bright[2]);
    }

    color.setAlpha(ctx.random(40, 80));
    return color;
  };

  private incrementNoisePhase(ctx: p5) {
    this.noisePhase += ctx.random(0.005, 0.01);
  }

  private resetCenter(ctx: p5) {
    ctx.translate(-this.center[0], -this.center[1]);
  }

  public draw(ctx: p5) {
    ctx.translate(this.center[0], this.center[1]);
    ctx.fill(this.color);
    ctx.beginShape();
    for (let i = 0; i < ctx.TWO_PI; i += 0.01) {
      let xOff = ctx.cos(i) + 1;
      const r = ctx.map(ctx.noise(xOff, this.noisePhase), 0, 1, 100, 200);
      const x = r * ctx.cos(i);
      const y = r * ctx.sin(i);
      ctx.vertex(x, y);
    }
    ctx.endShape(ctx.CLOSE);

    this.incrementNoisePhase(ctx);
    this.resetCenter(ctx);
  }
}

const blobs = (ctx: p5) => {
  const blobList: Blob[] = [];
  const drawBlob = (blob: Blob) => blob.draw(ctx);

  ctx.setup = () => {
    ctx.createCanvas(ctx.windowWidth, ctx.windowHeight);
    ctx.frameRate(30);
    ctx.noStroke();

    for (let i = 0; i < 4; i++) {
      blobList.push(new Blob(ctx));
    }
  };

  ctx.draw = () => {
    ctx.clear();
    blobList.map(drawBlob);
  };
};

export default blobs;
