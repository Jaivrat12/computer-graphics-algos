// API
function createPixel(x, y) {

    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    pixel.style.left = x + 'px';
    // pixel.style.top = y + 'px';
    pixel.style.bottom = y - 1 + 'px';
    return pixel;
}

const isWithinRange = (range, n) => n >= range.min && n <= range.max;

// return coord array from algos
// Modify pixel size controller to being a grid size controller
// Toggle grid lines
// Colours
class Canvas {

    // Constructor
    constructor(graph) {
        this.graph = graph;
    }

    // Getters & Setters
    get pixelSize() {
        return getComputedStyle(document.documentElement).getPropertyValue('--pixel-size');
    }
    set pixelSize(size) {
        document.documentElement.style.setProperty('--pixel-size', size + 'px');
    }
    get graphSize() {
        return this.graph.clientHeight;
    }

    // Methods
    drawPixel(x, y) {

        const pixelSize = this.pixelSize.replace('px', '');

        const range = { min: 1, max: this.graphSize / pixelSize };
        if (!(isWithinRange(range, x) && isWithinRange(range, y)))
            return;

        const _x = (x - 1) * pixelSize + 1;
        const _y = (y - 1) * pixelSize + 1;
        return this.graph.appendChild(createPixel(_x, _y));
    }
    clear() {
        document.querySelectorAll('.pixel').forEach((ele) => ele.remove());
    }
}


// Algos
function ddaAlgo(coord1, coord2, canvas) {

    const dy = coord2.y - coord1.y;
    const dx = coord2.x - coord1.x;

    const steps = Math.max(Math.abs(dy), Math.abs(dx));
    const incX = dx / steps;
    const incY = dy / steps;

    let { x, y } = coord1;
    for (let i = 0; i <= steps; i++) {

        canvas.drawPixel(Math.round(x), Math.round(y));
        x += incX;
        y += incY;
    }
}

function bresenhamAlgo(coord1, coord2, canvas) {

    let { x: x1, y: y1 } = coord1;
    let { x: x2, y: y2 } = coord2;
    // start from (x2, y2) if x1 > x2
    if (x1 > x2) {
        [x1, y1, x2, y2] = [x2, y2, x1, y1];
    }
    // if slope is negative use negative values of y to calc coords
    if (y1 > y2) {
        y1 = -y1; y2 = -y2;
    }

    const dx = x2 - x1;
    const dy = y2 - y1;
    let steepSlope = dy >= dx;
    // if slope >= 1, swap x and y of both coords
    if (steepSlope) {

        [x1, y1] = [y1, x1];
        [x2, y2] = [y2, x2];
    }

    let d = steepSlope ? 2 * dx - dy : 2 * dy - dx;
    const e = 2 * (steepSlope ? dx : dy);
    const ne = 2 * (steepSlope ? (dx - dy) : (dy - dx));

    for (let x = x1, y = y1; x <= x2; x++) {

        const coord = steepSlope ? { x: y, y: x } : { x, y };
        canvas.drawPixel(Math.abs(coord.x), Math.abs(coord.y));
        if (d <= 0) {
            d += e;
        } else {
            d += ne;
            y++;
        }
    }
}


// App
const canvas = new Canvas(document.querySelector('#graph'));

// Clear Button
const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', canvas.clear);

// Pixel Size Change
const pixelSize = document.querySelector('#pixel-size');
pixelSize.addEventListener('change', (e) => {

    canvas.clear();
    canvas.pixelSize = e.target.value;
    const maxVal = Math.round(canvas.graphSize / e.target.value);
    document.querySelector('#range-max').textContent = maxVal;
});

// Form Submit
const form = document.querySelector('#drawing-tool');
form.addEventListener('submit', (e) => {

    e.preventDefault();

    const coord1 = {
        x: Number(e.target['x1'].value),
        y: Number(e.target['y1'].value),
    };
    const coord2 = {
        x: Number(e.target['x2'].value),
        y: Number(e.target['y2'].value),
    };

    const algo = document.querySelector('#algo').value;
    if (algo === 'dda-algo') {
        ddaAlgo(coord1, coord2, canvas);
    }
    else if (algo === 'blg-algo') {
        bresenhamAlgo(coord1, coord2, canvas);
    }
});