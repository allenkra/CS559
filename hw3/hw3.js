const canvas = document.getElementById('solarSystemCanvas');
const ctx = canvas.getContext('2d');
const sunPositionSlider = document.getElementById('sunPosition');
const moonSpeedSlider = document.getElementById('moonSpeed');
const earthOrbitSlider = document.getElementById('earthOrbit');

const centerY = canvas.height / 2;

let time = 0;

function drawSolarSystem() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const sunX = parseInt(sunPositionSlider.value);
    const moonSpeed = parseInt(moonSpeedSlider.value);
    const earthOrbit = parseInt(earthOrbitSlider.value);

    let matrix = mat4.create();

    mat4.identity(matrix);

    // Draw Sun
    mat4.translate(matrix, matrix, [sunX, centerY, 0]);
    ctx.setTransform(matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]);
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(0, 0, 50, 0, 2 * Math.PI);
    ctx.fill();

    // Draw Earth
    let earthMatrix = mat4.clone(matrix);
    mat4.rotate(earthMatrix, earthMatrix, time / 50, [0, 0, 1]);
    mat4.translate(earthMatrix, earthMatrix, [earthOrbit, 0, 0]);
    ctx.setTransform(earthMatrix[0], earthMatrix[1], earthMatrix[4], earthMatrix[5], earthMatrix[12], earthMatrix[13]);
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(0, 0, 25, 0, 2 * Math.PI);
    ctx.fill();

    // Draw Moon
    let moonMatrix = mat4.clone(earthMatrix);
    mat4.rotate(moonMatrix, moonMatrix, time / moonSpeed, [0, 0, 1]);
    mat4.translate(moonMatrix, moonMatrix, [50, 0, 0]);
    ctx.setTransform(moonMatrix[0], moonMatrix[1], moonMatrix[4], moonMatrix[5], moonMatrix[12], moonMatrix[13]);
    ctx.fillStyle = 'gray';
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, 2 * Math.PI);
    ctx.fill();

    // Draw Satellite
    let satelliteMatrix = mat4.clone(earthMatrix);
    mat4.rotate(satelliteMatrix, satelliteMatrix, -time / 10, [0, 0, 1]);
    mat4.translate(satelliteMatrix, satelliteMatrix, [35, 0, 0]);
    ctx.setTransform(satelliteMatrix[0], satelliteMatrix[1], satelliteMatrix[4], satelliteMatrix[5], satelliteMatrix[12], satelliteMatrix[13]);
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, 2 * Math.PI);
    ctx.fill();

    // Draw Mars
    let marsMatrix = mat4.clone(matrix);
    mat4.rotate(marsMatrix, marsMatrix, -time / 80, [0, 0, 1]);
    mat4.translate(marsMatrix, marsMatrix, [300, 0, 0]);
    ctx.setTransform(marsMatrix[0], marsMatrix[1], marsMatrix[4], marsMatrix[5], marsMatrix[12], marsMatrix[13]);
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, 2 * Math.PI);
    ctx.fill();

    // Draw Mercury
    let mercuryMatrix = mat4.clone(matrix);
    mat4.rotate(mercuryMatrix, mercuryMatrix, time / 40, [0, 0, 1]);
    mat4.translate(mercuryMatrix, mercuryMatrix, [120, 0, 0]);
    ctx.setTransform(mercuryMatrix[0], mercuryMatrix[1], mercuryMatrix[4], mercuryMatrix[5], mercuryMatrix[12], mercuryMatrix[13]);
    ctx.fillStyle = '#ADD8E6';
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, 2 * Math.PI);
    ctx.fill();

    time++;
    requestAnimationFrame(drawSolarSystem);
}

drawSolarSystem();
