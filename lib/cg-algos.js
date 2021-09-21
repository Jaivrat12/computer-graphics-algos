function ddaAlgo(coord1, coord2) {

    const lineCoords = [];

    const dy = coord2.y - coord1.y;
    const dx = coord2.x - coord1.x;

    const steps = Math.max(Math.abs(dy), Math.abs(dx));
    const incX = dx / steps;
    const incY = dy / steps;

    let { x, y } = coord1;
    for (let i = 0; i <= steps; i++) {

        lineCoords.push({
            x: Math.round(x),
            y: Math.round(y),
        });
        x += incX;
        y += incY;
    }
    return lineCoords;
}

function bresenhamAlgo(coord1, coord2) {

    const lineCoords = [];

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
        lineCoords.push({
            x: Math.abs(coord.x),
            y: Math.abs(coord.y),
        });
        if (d <= 0) {
            d += e;
        } else {
            d += ne;
            y++;
        }
    }
    return lineCoords;
}

export { ddaAlgo, bresenhamAlgo };