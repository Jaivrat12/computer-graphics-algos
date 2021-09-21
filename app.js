import Canvas from './lib/canvas.js';
import { ddaAlgo, bresenhamAlgo } from './lib/cg-algos.js';


// New Canvas Object
const canvas = new Canvas(document.querySelector('#graph'));

// Clear Button
const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', canvas.clear);

// Pixel Size Change Handler
const pixelSize = document.querySelector('#pixel-size');
pixelSize.addEventListener('change', (e) => {

    canvas.clear();
    canvas.pixelSize = e.target.value;
    const maxVal = Math.round(canvas.graphSize / e.target.value);
    document.querySelector('#range-max').textContent = maxVal;
});

// Form Submit Handler [Drawing tool]
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
    const algoFns = {
        'dda-algo': ddaAlgo,
        'blg-algo': bresenhamAlgo, 
    };

    const coords = algoFns[algo](coord1, coord2);
    coords.forEach((coord) => canvas.drawPixel(coord.x, coord.y));
});