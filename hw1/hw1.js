function setup() {
    var Canvas = document.getElementById("myCanvas");
    var CannonBallSizeSlider = document.getElementById("sizeSlider");
    var PositionSlider = document.getElementById("positionSlider");
    var firing = false;
    
    function draw() {
        var context=Canvas.getContext('2d');
        dy = PositionSlider.value;
        var cannonballX = 220; // initial location of cannonball
        function drawWarship(){

            // clear Canvas
            Canvas.width = Canvas.width;
            // draw body
            context.lineWidth = 5;
            context.fillStyle = "green";
            context.beginPath();
            context.moveTo(100,200);
            context.lineTo(450,200);
            context.lineTo(350,280);
            context.lineTo(130,280);
            context.closePath();
            context.fill()

            // draw top
            context.beginPath();
            context.strokeStyle="blue";
            context.moveTo(200,200);
            context.lineTo(200,80);
            context.lineTo(280,80);
            context.lineTo(280,200);
            context.stroke();

            // draw cannon
            context.beginPath()
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
            context.stroke()
        
        }

        function drawCannonBall(){
            // Draw the cannonball
            if (firing) {
                ctx.beginPath();
                ctx.arc(cannonballX, 425, cannonballSize, 0, Math.PI * 2);
                ctx.fillStyle = "black";
                ctx.fill();
                ctx.closePath();
                cannonballX += 10;

                if (cannonballX > 800) {
                    firing = false;
                    cannonballX = 220; // Relocate cannonball when out of canvas
                }
            } else {
                ctx.beginPath();
                ctx.arc(cannonballX, 425, cannonballSize, 0, Math.PI * 2);
                ctx.fillStyle = "black";
                ctx.fill();
                ctx.closePath();
            }
        }

        drawWarship();
        requestAnimationFrame(drawCannonBall);
        context.save();
        context.translate(0,dy);
        drawFlag();

        context.restore();
    }
    PositionSlider.addEventListener("input",draw);
    draw();
}
window.onload = setup;