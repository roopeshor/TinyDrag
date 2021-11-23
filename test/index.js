// import { tinyDrag } from "../tinydrag-esm.js";
/** @type {HTMLCanvasElement} */
const cvs = document.getElementById("cvs");
const ctx = cvs.getContext("2d");
const POINT_SIZE = 10;

// some points
const points = [
  {
    x: 0,
    y: 0,
  },
  {
    x: 50,
    y: 50,
  },
  {
    x: 100,
    y: 0,
  },
];

// scale the canvas according to dpr
const scale = Math.round(window.devicePixelRatio);
const width = 400;
const height = 400;
console.log(ctx.getTransform());
cvs.width = width;
cvs.height = height;
cvs.style.width = width + "px";
cvs.style.height = height + "px";

// ctx.scale(1 / scale, 1 / scale);

tinyDrag(ctx, points, {
  onDrag: drawPoints,
	onSelect: drawPoints,
  onSelectionOut: function () {
    drawPoints(-1);
  },
});
// translate
ctx.translate(width / 2 * scale, height / 2 * scale);
console.log(ctx.getTransform());
ctx.lineWidth = 1.5;
function drawPoints(active = -1) {
  ctx.fillStyle = "black";
  ctx.fillRect(-width / 2, -height / 2, width, height);
  // draw points
  ctx.fillStyle = "white";

  for (let i = 0; i < points.length; i++) {
    if (i == active) {
      ctx.fillStyle = "#aaff99";
      circle(points[i].x, points[i].y, POINT_SIZE);
      ctx.fill();
      ctx.strokeStyle = "#000";
      circle(points[i].x, points[i].y, (POINT_SIZE * 5) / 6);
      ctx.stroke();
    } else {
      ctx.fillStyle = "white";
      circle(points[i].x, points[i].y, POINT_SIZE);
      ctx.fill();
    }
  }
}
drawPoints();

function circle(x, y, r = 10) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.closePath();
}
