function createPixel(x, y) {

    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    pixel.style.left = x + 'px';
    // pixel.style.top = y + 'px';
    pixel.style.bottom = y - 1 + 'px';
    return pixel;
}

const isWithinRange = (range, n) => n >= range.min && n <= range.max;

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

export default Canvas;