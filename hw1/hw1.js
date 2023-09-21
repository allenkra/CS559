let animation;
let firing = false; // check firing
let cannonBallPositionX = 350;

function draw() {
    var Canvas = document.getElementById("myCanvas");
    var CannonBallSizeSlider = document.getElementById("sizeSlider");
    var PositionSlider = document.getElementById("positionSlider");
    var cannonBallSize = CannonBallSizeSlider.value; 
    var context = Canvas.getContext('2d');
    var dy = PositionSlider.value;

    // Clear the canvas
    context.clearRect(0, 0, Canvas.width, Canvas.height);

    function drawWarship(){
        // draw body
        context.lineWidth = 5;
        context.fillStyle = "green";
        context.beginPath();
        context.moveTo(100,200);
        context.lineTo(450,200);
        context.lineTo(350,280);
        context.lineTo(130,280);
        context.closePath();
        context.fill();

        // draw top
        context.beginPath();
        context.strokeStyle="blue";
        context.moveTo(200,200);
        context.lineTo(200,80);
        context.lineTo(280,80);
        context.lineTo(280,200);
        context.stroke();

        // draw cannon
        context.beginPath();
        context.strokeStyle="black";
        context.lineWidth = 8;
        context.moveTo(260,110);
        context.lineTo(460,80);
        context.moveTo(260,160);
        context.lineTo(460,190);
        context.stroke();

        // flagpole
        context.beginPath();
        context.strokeStyle="black";
        context.lineWidth = 6;
        context.moveTo(145,200);
        context.lineTo(145,60);
        context.stroke();
    }

    function drawFlag(){
        // flag
        context.beginPath();
        context.fillStyle="yellow";
        context.strokeStyle="black";
        context.moveTo(145,60);
        context.lineTo(50,100);
        context.lineTo(145,140);
        context.closePath();
        context.fill();
        context.stroke();
    }

    function drawCannonBall() {
        context.fillStyle = "black";
        context.beginPath();
        context.arc(cannonBallPositionX, 135, cannonBallSize, 0, 2 * Math.PI);
        context.fill();
    }

    drawWarship();
    drawCannonBall();
    context.save();
    context.translate(0, dy);
    drawFlag();
    context.restore();

    // update the location of cannonball
    if(firing) {
        cannonBallPositionX += 5; // speed

        // check out of canvas
        if(cannonBallPositionX > Canvas.width) {
            stopFiring();
        }
    }
}

function stopFiring() {
    firing = false;
    cancelAnimationFrame(animation); // stop
    cannonBallPositionX = 350; // relocate the cannon ball to the beginning
    draw(); // Redraw the scene once to reset position
}

function fireCannon() {
    firing = true; 
    animate();
}

function animate() {
    draw(); 
    animation = requestAnimationFrame(animate);
}

function setup() {
    var CannonBallSizeSlider = document.getElementById("sizeSlider");
    var PositionSlider = document.getElementById("positionSlider");

    // silder event
    CannonBallSizeSlider.addEventListener("input", draw);
    PositionSlider.addEventListener("input", draw);

    draw();
}

window.onload = setup;
