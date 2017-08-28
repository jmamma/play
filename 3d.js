
function load() {

wavecanvas = document.getElementById('wavecanvas');
wavecontext = wavecanvas.getContext('2d');

objects = []
vertices = [];

offset = 50;
width = 10;

//camera co-ordinates
c_x = 0;
c_y = 0;
c_z = 0;

rotx = 0;
roty = 0;
rotz = 0;

//Add cube


add_vertices(-1, -1, -1);
add_vertices(-1, -1,  1);
add_vertices(1, -1, -1);
add_vertices(1, -1, 1);

add_vertices(1, 1, -1);
add_vertices(1, 1,  1);
add_vertices(-1, 1, -1);
add_vertices(-1, 1, 1);

add_vertices(-2, 1, 1);

time = 0;
timeinc = .1;
//requestAnimationFrame(drawLoop)
//rotate_about_x(45);
rotate_about_y(28);
setInterval(function() { drawLoop() }, 1000/60);

}


function rotate_about_x(angle) {
      rangle = angle * .0174533
      for (var n = 0; n < vertices.length; n++) {
            y = vertices[n].y;
            z = vertices[n].z;
            vertices[n].y = Math.cos(rangle) * y - Math.sin(rangle) * z;

            vertices[n].z = Math.sin(rangle) * y + Math.cos(rangle) * z; 

        }
     
}
function rotate_about_y(angle) {
      rangle = angle * .0174533
      for (var n = 0; n < vertices.length; n++) {
            x = vertices[n].x;
            z = vertices[n].z;
            vertices[n].x = Math.cos(rangle) * x + Math.sin(rangle) * z;

            vertices[n].z = -1 * Math.sin(rangle) * x + Math.cos(rangle) * z; 

        }
     
}
function rotate_about_z(angle) {
      rangle = angle * .0174533
      for (var n = 0; n < vertices.length; n++) {
            x = vertices[n].x;
            y = vertices[n].y;
            vertices[n].x = Math.cos(rangle) * x + Math.sin(rangle) * z;

            vertices[n].z = -1 * Math.sin(rangle) * x + Math.cos(rangle) * z; 

        }
     
}

function add_vertices(xarg, yarg, zarg) {
    var vertex = {  x:xarg, y:yarg, z:zarg };   
    
    vertices.push(vertex);


}
var angle = 0
function drawLoop() {

//requestAnimationFrame(drawLoop);
angle = angle + 1;
if (angle >= 360) {
angle = 0;
}
wavecontext.clearRect ( 0 , 0 , wavecanvas.width, wavecanvas.height );

rotate_about_x(1);
rotate_about_y(1);
roty = .017 * angle;

    wavecontext.strokeRect(Math.cos(roty) * 55 + 100,Math.sin(roty) * 55 + 50, 2, 2);
for (var n = 0; n < vertices.length; n++) {
            
            draw_vertices(vertices[n]);
    

        }





}
/*
function draw_vertices(v) {
    var b_x = 0, b_y = 0; 
    b_z = 20;
    var a_x, a_y;
    
    b_x = v.x * (b_z / v.z);
    b_y = v.y * (b_z / v.z);
    wavecontext.strokeRect(v.x * 10 + 100, v.y * 10 + 100, 2, 2);
    
}
*/

//Working, no camera rotaiton
/*  
function draw_vertices(v) {
    var b_x = 0, b_y = 0; 
    b_z = 500;
    var a_x, a_y;
    
    b_x = v.x * (b_z / (v.z + 20));
    b_y = v.y * (b_z / (v.z + 20));
    wavecontext.strokeRect(b_x + 100,b_y + 100, 2, 2);
    
}
*/
function draw_vertices(v) {
    var b_x = 0, b_y = 0; 
    b_z = 1000;
    var a_x, a_y;

    d_x = Math.cos(roty) * (v.x + 120) + Math.sin(roty) * (v.z + 50);
    d_y = v.y;
    d_z = -1 * Math.sin(roty) * (v.x + 120) + Math.cos(roty) * (v.z + 50); 



    b_x = d_x * (b_z / (d_z));
    b_y = d_y * (b_z / (d_z));
    wavecontext.strokeRect(b_x + 100,b_y + 100, 2, 2);
    
}



