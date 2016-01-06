
function load() {

wavecanvas = document.getElementById('wavecanvas');
wavecontext = wavecanvas.getContext('2d');

particles = [];

offset = 50;
width = 10;

//Spring Damping Model

k = 1;
m= 10;
c = .5;
w0 = Math.sqrt(k/m);
C = c / (2 * Math.sqrt(m * k));
e = 2.718281828459045;
//C = 5;
//Generate Particles

for (var x = 0; x < 50; x++) {
    var array = [];
    for (var y = 0; y < 50; y++) {
            if (x==0 || y == 0 || x == 50 - 1 || y == 50 - 1) {
            //Boundary
            type = 1;
            }
            else {
            //Particle
            type = 0;
            }
            var particle = { type:type, x_origin:(offset + x * width), y_origin:(offset + y * width), dx:0, dy:0, dxn:0, dyn:0, neighbors:[] };   
            array.push(particle);
    }
    particles.push(array);

}

time = 0;
requestAnimationFrame(waveLoop);

}
timeinc = .1;
function waveLoop() {
time = time + timeinc;
wavecontext.clearRect ( 0 , 0 , wavecanvas.width, wavecanvas.height );
process_force(particles[20][20],time);

for (var x = 1; x < particles.length - 1; x++) {
    for (var y = 1; y < particles[x].length - 1; y++) {
            var particle = particles[x][y];

               var F1 = calc_force(particle,particles[x][y + 1],270);
               var F2 = calc_force(particle,particles[x][y - 1],90);

               var F3 = calc_force(particle,particles[x - 1][y],180);
               var F4 = calc_force(particle,particles[x - 1][y + 1],225);
               var F5 = calc_force(particle,particles[x - 1][y - 1],135);

               var F6 = calc_force(particle,particles[x + 1][y],0);
               var F7 = calc_force(particle,particles[x + 1][y + 1],315);
               var F8 = calc_force(particle,particles[x + 1][y - 1],45);

               particle.dx = particle.dxn / 1;
          particle.dy = particle.dyn / 1;

               particle.dxn = (F1.x + F2.x + F3.x + F4.x + F5.x + F6.x + F7.x + F8.x) / 4.9;
               particle.dyn = (F1.y + F2.y + F3.y + F4.y + F5.y + F6.y + F7.y + F8.y) / 4.9;

//particle.dx = particle.dxn;
//            particle.dy = particle.dyn;

            draw_particle(particle);
    

        }
}



requestAnimationFrame(waveLoop);

}
function process_force(particle,time) {
    particle.type = 2;
    if (time < 10) {
    particle.dxn = Math.sin(time) * 8;
    particle.dyn = Math.cos(time) * 8;
    }
}
function draw_particle(particle) {
    if (particle.type == 1) {
        wavecontext.strokeStyle = 'Red'; 
    }
    if (particle.type == 1) {
        wavecontext.strokeStyle = 'Blue';
    }
    else {
        wavecontext.strokeStyle = 'Black';
    }
    wavecontext.strokeRect(particle.x_origin + particle.dxn,particle.y_origin + particle.dyn, 2, 2);
    
}

function calc_force(particle_a, particle_b,angle) {


       var Pb_MagN = Math.sqrt(Math.pow(particle_b.dxn,2) + Math.pow(particle_b.dyn,2));
       var Pb_Mag = Math.sqrt(Math.pow(particle_b.dx,2) + Math.pow(particle_b.dy,2));
       var Pb_F = (Pb_MagN - Pb_Mag) * k - (c * (Pb_MagN - Pb_Mag)/timeinc);

       var xdiff = particle_b.x_origin + particle_b.dxn - (particle_a.x_origin + particle_a.dxn);
       var ydiff = particle_b.y_origin + particle_b.dyn - (particle_a.y_origin + particle_a.dyn);

       var theta = Math.atan(ydiff/xdiff);
// var theta = angle * 0.0174532925;
       var Pb_Fx = Pb_MagN  * Math.cos(theta) * .95;
       var Pb_Fy = Pb_MagN  * Math.sin(theta) * .95;

       return {
       x: Pb_Fx, y: Pb_Fy
       }
       
       document.getElementById("output").innerHTML = ydiff;
       

}



