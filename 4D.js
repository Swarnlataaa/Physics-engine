const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

const points = [];
const numPoints = 100;

// Generate random 4D points
for (let i = 0; i < numPoints; i++) {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    const z = Math.random() * 200 - 100;
    const w = Math.random() * 200 - 100;

    points.push({ x, y, z, w });
}

function project4Dto3D(point) {
    const perspective = 500; // Adjust this for perspective
    const scale = perspective / (perspective + point.w);

    return {
        x: point.x * scale,
        y: point.y * scale,
        z: point.z * scale,
    };
}

function draw() {
    ctx.clearRect(0, 0, width, height);

    for (const point of points) {
        const { x, y, z } = project4Dto3D(point);

        ctx.beginPath();
        ctx.arc(width / 2 + x, height / 2 - y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
    }

    requestAnimationFrame(draw);
}

draw();
