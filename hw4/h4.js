function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var slider1 = document.getElementById('slider1');
	var slider2 = document.getElementById('slider2');
	var slider3 = document.getElementById('slider3');
	var slider4 = document.getElementById('slider4');
	var slider5 = document.getElementById('slider5');
    slider1.value = -25;

    function draw() {
	canvas.width = canvas.width;
	// use the sliders to get the angles
	var tParam = slider1.value*0.01;
	var p1px = slider2.value;
	var p1py = slider3.value;
	var p1dx = slider4.value;
	var p1dy = slider5.value;

	
	function moveToTx(loc,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.moveTo(res[0],res[1]);}

	function lineToTx(loc,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.lineTo(res[0],res[1]);}
	
	function drawObject(color,Tx) {
	    context.beginPath();
	    context.fillStyle = color;
	    moveToTx([-.05,-.05],Tx);
	    lineToTx([-.05,.05],Tx);
            lineToTx([.05,.05],Tx);
      	    lineToTx([.1,0],Tx);
	    lineToTx([.05,-.05],Tx);
	    context.closePath();
	    context.fill();
	}


	var Hermite = function(t) {
	    return [
		2*t*t*t-3*t*t+1,
		t*t*t-2*t*t+t,
		-2*t*t*t+3*t*t,
		t*t*t-t*t
	    ];
	}

	var HermiteDerivative = function(t) {
            return [
		6*t*t-6*t,
		3*t*t-4*t+1,
		-6*t*t+6*t,
		3*t*t-2*t
            ];
	}

	function Cubic(basis,P,t){
	    var b = basis(t);
	    var result=vec2.create();
	    vec2.scale(result,P[0],b[0]);
	    vec2.scaleAndAdd(result,result,P[1],b[1]);
	    vec2.scaleAndAdd(result,result,P[2],b[2]);
	    vec2.scaleAndAdd(result,result,P[3],b[3]);
	    return result;
	}


	function drawTrajectory(t_begin,t_end,intervals,C,Tx,color) {
	    context.strokeStyle=color;
	    context.beginPath();
            moveToTx(C(t_begin),Tx);
            for(var i=1;i<=intervals;i++){
		var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end;
		lineToTx(C(t),Tx);
            }
            context.stroke();
	}
	        var points = [
            {p: [0, 0], d: [2, 0]},
            {p: [p1px, p1py], d: [p1dx, p1dy]},
            {p: [2, 2], d: [-2, 0]},
            {p: [0, -2], d: [0, -2]}
        ];

        // Function to draw the track
        function drawTrack() {
            var color = ["red", "blue", "green", "purple"];
            for (var i = 0; i < points.length; i++) {
                var P0 = [points[i].p, points[i].d, points[(i + 1) % points.length].p, points[(i + 1) % points.length].d];
                var C0 = function(t_) { return Cubic(Hermite, P0, t_); };
                var Tblue_to_canvas = mat3.create();
                mat3.fromTranslation(Tblue_to_canvas, [200, 200]);
                mat3.scale(Tblue_to_canvas, Tblue_to_canvas, [60, -60]); 
                drawTrajectory(0.0, 1.0, 100, C0, Tblue_to_canvas, color[i]);
            }
        }

        function drawCars(t) {
            for (var i = 0; i < points.length; i++) {
                var P0 = [points[i].p, points[i].d, points[(i + 1) % points.length].p, points[(i + 1) % points.length].d];
                var C0 = function(t_) { return Cubic(Hermite, P0, t_); };
                var C0prime = function(t_) { return Cubic(HermiteDerivative, P0, t_); };

                var Tgreen_to_blue = mat3.create();
                mat3.fromTranslation(Tgreen_to_blue, C0(t));
                var Tgreen_to_canvas = mat3.create();
                var tangent = C0prime(t);
                var angle = Math.atan2(tangent[1], tangent[0]);
                mat3.rotate(Tgreen_to_blue, Tgreen_to_blue, angle);
                var Tblue_to_canvas = mat3.create();
                mat3.fromTranslation(Tblue_to_canvas, [200, 200]);
                mat3.scale(Tblue_to_canvas, Tblue_to_canvas, [60, -60]); 
                mat3.multiply(Tgreen_to_canvas, Tblue_to_canvas, Tgreen_to_blue);
                drawObject("black", Tgreen_to_canvas);
            }
        }

        drawTrack();
        drawCars(tParam);   
    }
	
    slider1.addEventListener("input",draw);
	slider2.addEventListener("input",draw);
	slider3.addEventListener("input",draw);
	slider4.addEventListener("input",draw);
	slider5.addEventListener("input",draw);
    draw();
}
window.onload = setup;

