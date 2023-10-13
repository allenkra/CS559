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

    // Draw Sun
    ctx.save();
    ctx.translate(sunX, centerY);
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(0, 0, 50, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();

    // Draw Earth
    ctx.save();
    ctx.translate(sunX, canvas.height / 2);
    ctx.rotate(time / 50);
    ctx.translate(earthOrbit, 0);  // Slider to control orbit size
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(0, 0, 25, 0, 2 * Math.PI);
    ctx.fill();

    // Draw Moon
    ctx.save();  // Save Earth's coordinate system state
    ctx.rotate(time / moonSpeed); // Change the speed by slider
    ctx.translate(50, 0);
    ctx.fillStyle = 'gray';
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();  // Back to Earth

    // Draw Satellite
    ctx.save();  // Save Earth's coordinate system state again for the satellite
    ctx.rotate(-time / 10);  // Rotate in the opposite direction for variety
    ctx.translate(35, 0);  // Adjust distance from the Earth
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, 2 * Math.PI);  // Smaller size
    ctx.fill();
    ctx.restore();  // Restore to Earth

    ctx.restore();  // Back to Sun

    // Draw Mars
    ctx.save();
    ctx.translate(sunX, centerY);
    ctx.rotate(-time / 80);
    ctx.translate(300, 0);
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();

    // Draw Mercury
    ctx.save();
    ctx.translate(sunX, centerY);
    ctx.rotate(time / 40);
    ctx.translate(120, 0);
    ctx.fillStyle = '#ADD8E6';
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();

    time++;
    requestAnimationFrame(drawSolarSystem); // call animation
}

drawSolarSystem();
