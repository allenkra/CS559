function start() {

    function Curve(t){
        var result = [5.0*Math.cos(2.0*Math.PI*t),4.0*t,3.0*Math.sin(2.0*Math.PI*t)];
        return result;
    }

    // Get canvas, WebGL context
    var canvas = document.getElementById("mycanvas");
    var gl = canvas.getContext("webgl");

    // Sliders at center
    var slider1 = document.getElementById('slider1');
    slider1.value = 0;
    var slider2 = document.getElementById('slider2');
    slider2.value = 0;
    var slider3 = document.getElementById('slider3');
    slider3.value = 0;


    // Read shader source
    var vertexSource = document.getElementById("vertexShader").text;
    var fragmentSource = document.getElementById("fragmentShader").text;

    // Compile vertex shader
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader,vertexSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
	alert(gl.getShaderInfoLog(vertexShader)); return null; }
    
    // Compile fragment shader
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader,fragmentSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
	alert(gl.getShaderInfoLog(fragmentShader)); return null; }
    
    // Attach the shaders and link
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
	alert("Could not initialize shaders"); }
    gl.useProgram(shaderProgram);	    
    
    // with the vertex shader, we need to pass it positions
    // as an attribute - so set up that communication
    shaderProgram.PositionAttribute = gl.getAttribLocation(shaderProgram, "vPosition");
    gl.enableVertexAttribArray(shaderProgram.PositionAttribute);
    
    shaderProgram.NormalAttribute = gl.getAttribLocation(shaderProgram, "vNormal");
    gl.enableVertexAttribArray(shaderProgram.NormalAttribute);
    
    shaderProgram.ColorAttribute = gl.getAttribLocation(shaderProgram, "vColor");
    gl.enableVertexAttribArray(shaderProgram.ColorAttribute);
    
    shaderProgram.texcoordAttribute = gl.getAttribLocation(shaderProgram, "vTexCoord");
    gl.enableVertexAttribArray(shaderProgram.texcoordAttribute);
   
    // this gives us access to the matrix uniform
    shaderProgram.MVmatrix = gl.getUniformLocation(shaderProgram,"uMV");
    shaderProgram.MVNormalmatrix = gl.getUniformLocation(shaderProgram,"uMVn");
    shaderProgram.MVPmatrix = gl.getUniformLocation(shaderProgram,"uMVP");

    // Data ...
    
    // vertex positions
    var vertexPos = new Float32Array(
        [  -1, -1, 0,   1, -1, 0,   1, 1, 0,    -1, 1, 0, // base rectangle,0123
           -1, -1, 0,   1, -1, 0,   0, 0, 2,    // 456
            1, -1, 0,   1, 1, 0,    0, 0, 2,    // 789
            1, 1, 0,   -1, 1, 0,    0, 0, 2,    // 10 11 12
            -1, 1, 0,   -1, -1, 0,    0, 0, 2, ]); // 13 14 15

    var vertex_normals = new Float32Array([
    // # Base 
        0,  0, -1,   
        0,  0, -1,   
        0,  0, -1,   
        0,  0, -1,  

    // # Side 1
        0, -1,  1,   
        0, -1,  1,   
        0, -1,  1,   

    // # Side 2
        1,  0,  1,  
        1,  0,  1,  
        1,  0,  1,  

    // # Side 3
        0,  1,  1,   
        0,  1,  1,   
        0,  1,  1,   
    
        // # Side 4
        -1,  0,  1,   
        -1,  0,  1,   
        -1,  0,  1,   
    ]);
            
    // vertex colors
    var vertexColors = new Float32Array(
        [  0.153, 0.101, 0.021,   0.153, 0.101, 0.021,   0.153, 0.101, 0.021,  0.153, 0.101, 0.021, //blue
           0.250, 0.250, 0.210,   0.250, 0.250, 0.210,   0.250, 0.250, 0.210,   //red
           0.238, 0.232, 0.170,   0.238, 0.232, 0.170,   0.238, 0.232, 0.170,   //green
           0.255, 0.215, 0,   0.255, 0.215, 0,   0.255, 0.215, 0,   //yellow
           0.240, 0.230, 0.140,   0.240, 0.230, 0.140,   0.240, 0.230, 0.140,]);    //pink
    
    
    // element index array
    var triangleIndices = new Uint8Array([
        // Base (as two triangles)
        0, 1, 2,    0, 2, 3,
    
        4, 5, 6,    // Side 1
        7, 8, 9,    // Side 2
        10, 11, 12, // Side 3
        13, 14, 15  // Side 4
    ]);
    

    // we need to put the vertices into a buffer so we can
    // block transfer them to the graphics hardware
    var trianglePosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexPos, gl.STATIC_DRAW);
    trianglePosBuffer.itemSize = 3;
    trianglePosBuffer.numItems = 16;
    
    // a buffer for colors
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexColors, gl.STATIC_DRAW);
    colorBuffer.itemSize = 3;
    colorBuffer.numItems = 16;

    // a buffer for normals
    var triangleNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertex_normals, gl.STATIC_DRAW);
    triangleNormalBuffer.itemSize = 3;
    triangleNormalBuffer.numItems = 16;

    // a buffer for indices
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, triangleIndices, gl.STATIC_DRAW);    

    // Scene (re-)draw routine
    function draw() {
	
        // Translate slider values to angles in the [-pi,pi] interval
        var angle1 = slider1.value*0.01*Math.PI;
        var angle2 = slider2.value*0.01*Math.PI;
        var tParam = slider3.value*0.01;
        // Circle around the y-axis
        var eye = [400*Math.cos(angle1),400*Math.sin(angle1),300];
        var target = [0,0,0];
        var up = [0,0,1];
	
        var tModel = mat4.create();
        mat4.fromScaling(tModel,[20,20,20]);
        // mat4.multiply(tModel, tModel, Curve(tParam));
          mat4.rotate(tModel,tModel,angle2,Curve(tParam));
        // 获取曲线上的当前点
        var curvePoint = Curve(tParam);
        // 将模型平移到曲线上的当前点
        mat4.translate(tModel, tModel, curvePoint);
	
        var tCamera = mat4.create();
        mat4.lookAt(tCamera, eye, target, up);      

        var tProjection = mat4.create();
        mat4.perspective(tProjection,Math.PI/4,1,10,1000);
	
        var tMV = mat4.create();
        var tMVn = mat3.create();
        var tMVP = mat4.create();
        mat4.multiply(tMV,tCamera,tModel); // "modelView" matrix
        mat3.normalFromMat4(tMVn,tMV);
        mat4.multiply(tMVP,tProjection,tMV);
	
        // Clear screen, prepare for rendering
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
        // Set up uniforms & attributes
        gl.uniformMatrix4fv(shaderProgram.MVmatrix,false,tMV);
        gl.uniformMatrix3fv(shaderProgram.MVNormalmatrix,false,tMVn);
        gl.uniformMatrix4fv(shaderProgram.MVPmatrix,false,tMVP);
                 
        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
        gl.vertexAttribPointer(shaderProgram.PositionAttribute, trianglePosBuffer.itemSize,
          gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer);
        gl.vertexAttribPointer(shaderProgram.NormalAttribute, triangleNormalBuffer.itemSize,
          gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.vertexAttribPointer(shaderProgram.ColorAttribute, colorBuffer.itemSize,
          gl.FLOAT,false, 0, 0);

	// Do the drawing
        gl.drawElements(gl.TRIANGLES, triangleIndices.length, gl.UNSIGNED_BYTE, 0);

    }

    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    slider3.addEventListener("input",draw);
    draw();
}

window.onload=start;



