// SNAP
// © 2018 Diego T.
// github.com/diegotorresd

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

const between = (a, b) => Math.round(Math.random() * (b - a) + a)

const W = 1000 // size of the canvas
const gridSize = between(25, 125)
const duration = between(10000, 30000) // ms
const R = 0.25
const N = between(100, 5000)

function drawGrid (n) {
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)'
  ctx.beginPath()
  for (let i = 0; i < W / n; i++) {
    ctx.moveTo(n * i, 0)
    ctx.lineTo(n * i, W)
    ctx.moveTo(0, n * i)
    ctx.lineTo(W, n * i)
  }
  ctx.stroke()
}

function randomPoints (N) {
  return [...Array(N)].map(_ => [ Math.random() * W, Math.random() * W ])
}

function drawPoint ([x, y]) {
  ctx.beginPath()
  ctx.arc(x, y, R, 0, 2 * Math.PI)
  ctx.fill()
}

const roundToNearest = w => x => Math.round(x / w) * w
const roundToGrid = roundToNearest(gridSize)
const d = (a, b) => Math.abs(a - b)

function snapToGrid ([x, y]) {
  let rx = roundToGrid(x)
  let ry = roundToGrid(y)
  let cond = d(rx, x) <= d(ry, y)
  return cond ? [rx, y] : [x, ry]
}

function reloadPage () {
  window.location = window.location
}

let start = null
function frame (timestamp) {
  if (!start) start = timestamp
  let t = (timestamp - start) / duration
  for (let i = 0; i < points.length; i++) {
    let [x, y] = points[i]
    let [xs, ys] = snappedPoints[i]
    drawPoint([ (xs - x) * t + x, (ys - y) * t + y ])
  }
  if (t <= 1.0) {
    window.requestAnimationFrame(frame)
  } else {
    window.setTimeout(reloadPage, duration / 3)
  }
}

drawGrid(gridSize)
let points = randomPoints(N)
let snappedPoints = points.map(snapToGrid)
window.requestAnimationFrame(frame)