const PI = Math.PI;
const canvas = document.getElementById('solarSystemCanvas');
const ctx = canvas.getContext('2d');
const sunPositionSlider = document.getElementById('sunPosition');
const moonSpeedSlider = document.getElementById('moonSpeed');
const earthOrbitSlider = document.getElementById('earthOrbit');
// initialize stack
const centerY = canvas.height / 2;


let time = 0;

    
function drawSolarSystem() {

    function arcTx(r,begin,end)
    {var res=vec2.create(); vec2.transformMat3(res,[0,0],stack[0]); ctx.arc(res[0], res[1], r, begin, end);}

    var stack = [mat3.create()];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const sunX = parseInt(sunPositionSlider.value);
    const moonSpeed = parseInt(moonSpeedSlider.value);
    const earthOrbit = parseInt(earthOrbitSlider.value);

    
    // Draw Sun
    // ctx.save();
    // ctx.translate(sunX, centerY);
    // ctx.fillStyle = 'yellow';
    // ctx.beginPath();
    // ctx.arc(0, 0, 50, 0, 2 * Math.PI);
    // ctx.fill();
    // ctx.restore();

    // Draw Sun , matrix style
    var TSunToCanvas = mat3.create();
    mat3.fromTranslation(TSunToCanvas,[sunX, centerY]);
    mat3.multiply(stack[0], stack[0], TSunToCanvas); 
    stack.unshift(mat3.clone(stack[0])); // save

    ctx.beginPath();
    ctx.fillStyle = 'yellow';
    arcTx(60,0,2 * PI);
    ctx.fill();
    //stack.shift(); // restore


    // Draw Earth
    // ctx.save();
    // ctx.translate(sunX, canvas.height / 2);
    // ctx.rotate(time / 50);
    // ctx.translate(earthOrbit, 0);  // Slider to control orbit size
    // ctx.fillStyle = 'blue';
    // ctx.beginPath();
    // ctx.arc(0, 0, 25, 0, 2 * Math.PI);
    // ctx.fill();



    // Draw Earth, matrix style 

    // save 
    stack.unshift(mat3.clone(stack[0])); 
    var TEarthToSun = mat3.create();
    mat3.fromTranslation(TEarthToSun,[sunX, canvas.height / 2]);
    mat3.fromTranslation(TEarthToSun,[earthOrbit, 0]);
    mat3.rotate(TEarthToSun,TEarthToSun, time / 50);
    mat3.multiply(stack[0], stack[0], TEarthToSun);
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    arcTx(25,0,2*PI);
    ctx.fill();

    // Draw Moon, matrix style
    stack.unshift(mat3.clone(stack[0])); // save Earth's matrix state
    var TMoonToEarth = mat3.create();
    mat3.rotate(TMoonToEarth, TMoonToEarth, time / moonSpeed); 
    mat3.translate(TMoonToEarth, TMoonToEarth, [50, 0]);  
    mat3.multiply(stack[0], stack[0], TMoonToEarth); 

    ctx.beginPath();
    ctx.fillStyle = 'gray';
    arcTx(10, 0, 2 * PI);
    ctx.fill();
    stack.shift(); // restore to Earth's matrix state

    // Draw Satellite, matrix style
    stack.unshift(mat3.clone(stack[0])); // save Earth's matrix state again
    var TSatelliteToEarth = mat3.create();
    mat3.rotate(TSatelliteToEarth, TSatelliteToEarth, -time / 10); 
    mat3.translate(TSatelliteToEarth, TSatelliteToEarth, [35, 0]);  
    mat3.multiply(stack[0], stack[0], TSatelliteToEarth); 

    ctx.beginPath();
    ctx.fillStyle = 'white';
    arcTx(5, 0, 2 * PI);
    ctx.fill();
    stack.shift(); // restore to Earth's matrix state

    stack.shift(); // restore to Sun's matrix state

    // Draw Mars, matrix style
    stack.unshift(mat3.clone(stack[0])); // save
    var TMarsToSun = mat3.create();
    mat3.rotate(TMarsToSun, TMarsToSun, -time / 80); 
    mat3.translate(TMarsToSun, TMarsToSun, [300, 0]);  
    mat3.multiply(stack[0], stack[0], TMarsToSun); 

    ctx.beginPath();
    ctx.fillStyle = 'red';
    arcTx(20, 0, 2 * PI);
    ctx.fill();
    stack.shift(); // restore

    // Draw Mercury, matrix style
    stack.unshift(mat3.clone(stack[0])); // save
    var TMercuryToSun = mat3.create();
    mat3.rotate(TMercuryToSun, TMercuryToSun, time / 40); 
    mat3.translate(TMercuryToSun, TMercuryToSun, [120, 0]);  
    mat3.multiply(stack[0], stack[0], TMercuryToSun); 

    ctx.beginPath();
    ctx.fillStyle = '#ADD8E6';
    arcTx(15, 0, 2 * PI);
    ctx.fill();
    stack.shift(); // restore
    // // Draw Moon
    // ctx.save();  // Save Earth's coordinate system state
    // ctx.rotate(time / moonSpeed); // Change the speed by slider
    // ctx.translate(50, 0);
    // ctx.fillStyle = 'gray';
    // ctx.beginPath();
    // ctx.arc(0, 0, 10, 0, 2 * Math.PI);
    // ctx.fill();
    // ctx.restore();  // Back to Earth

    



    // // Draw Satellite
    // ctx.save();  // Save Earth's coordinate system state again for the satellite
    // ctx.rotate(-time / 10);  // Rotate in the opposite direction for variety
    // ctx.translate(35, 0);  // Adjust distance from the Earth
    // ctx.fillStyle = 'white';
    // ctx.beginPath();
    // ctx.arc(0, 0, 5, 0, 2 * Math.PI);  // Smaller size
    // ctx.fill();
    // ctx.restore();  // Restore to Earth

    // ctx.restore();  // Back to Sun

    // // Draw Mars
    // ctx.save();
    // ctx.translate(sunX, centerY);
    // ctx.rotate(-time / 80);
    // ctx.translate(300, 0);
    // ctx.fillStyle = 'red';
    // ctx.beginPath();
    // ctx.arc(0, 0, 20, 0, 2 * Math.PI);
    // ctx.fill();
    // ctx.restore();

    // // Draw Mercury
    // ctx.save();
    // ctx.translate(sunX, centerY);
    // ctx.rotate(time / 40);
    // ctx.translate(120, 0);
    // ctx.fillStyle = '#ADD8E6';
    // ctx.beginPath();
    // ctx.arc(0, 0, 15, 0, 2 * Math.PI);
    // ctx.fill();
    // ctx.restore();

    time++;
    requestAnimationFrame(drawSolarSystem); // call animation
}

drawSolarSystem();
