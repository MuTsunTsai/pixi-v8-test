import { Application, Graphics } from "pixi.js";
import type { LineCap } from "pixi.js";

const app = new Application();
await app.init({
    preference: "webgpu", // or "webgl"
	canvas: document.createElement('canvas'),
    antialias: true,
    resolution: 2,
    autoDensity: true,
	backgroundColor: "white",
});
document.body.appendChild(app.canvas);
console.log(app.renderer.name);

const graphics2 = new Graphics();
// PIXI.Graphics.prototype.drawStar = PIXI.smooth.SmoothGraphics.prototype.drawStar;
graphics2.y = 300;
app.stage.addChild(graphics2);

let phase = 0;// -Math.PI/2;

function addLine(graphics: Graphics, y: number, len: number, rad: number, cap: LineCap) {
	graphics.setStrokeStyle({ width: 30, color: 0, alpha: 1, join: "miter", cap });
	graphics.moveTo(150 - len, y);
	graphics.lineTo(150, y);
	graphics.lineTo(150 + Math.cos(phase) * rad, y + Math.sin(phase) * rad);
	graphics.stroke();

	graphics.setStrokeStyle({ width: 30, color: 0, alpha: 1, join: "bevel", cap });
	graphics.moveTo(350 + Math.cos(phase) * rad, y + Math.sin(phase) * rad);
	graphics.lineTo(350, y);
	graphics.lineTo(350 - len, y);
	graphics.stroke();

	graphics.setStrokeStyle({ width: 30, color: 0, alpha: 1, join: "round", cap });
	graphics.moveTo(550 - len, y);
	graphics.lineTo(550, y);
	graphics.lineTo(550 + Math.cos(phase) * rad, y + Math.sin(phase) * rad);
	graphics.stroke();
}

function makeFigures(graphics: Graphics) {
	graphics.clear();

	addLine(graphics, 100, 50, 60, "butt");
	addLine(graphics, 200, 50, 60, "round");
}

// graphics.rotation = Math.PI * 3 / 2 - 0.0001;
app.ticker.add((ticker) => {
	phase -= 0.008 * ticker.deltaTime;
	// makeFigures(graphics);
	makeFigures(graphics2);
});

app.start();
