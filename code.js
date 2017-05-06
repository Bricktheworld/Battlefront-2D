var stars = [];
var lazerrs = [];
var lazerls = [];
var ties = [];
var tieimg;
var explodes = [];
function preload() {
  tieimg = loadImage("tie.png");
}
function Particle(x,y){
    this.pos = createVector(x,y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(2, 10));
    this.update = function(){
    this.pos.add(this.vel);  
    };
    this.show = function(){
          fill(255,50,0,100);
          ellipse(this.pos.x,this.pos.y,2,2);
    };
}
//Stars
function Star(x,y){
    this.pos = createVector(x,y);
    this.vel = createVector(0,0);
    this.update = function(){
        var mousevel = createVector(width/2 - mouseX,height/2 - mouseY);
        mousevel.setMag(5);
        this.vel.lerp(mousevel, 0.2);
        this.pos.add(this.vel);
    if(this.pos.x > width){
        this.pos = createVector(0, this.pos.y);
    }else if(this.pos.x < 0){
        this.pos = createVector(width, this.pos.y);
    }else if(this.pos.y > height){
        this.pos = createVector(this.pos.x, 0);
    }else if(this.pos.y < 0){
        this.pos = createVector(this.pos.x, height);
    }
    };
    this.show = function(){
        fill(255);
        ellipse(this.pos.x,this.pos.y,4,4);
    };
}
function LazerL(){
    this.x1 = 0;    
    this.x2 = 20;
    this.y1 = height;
    this.y2 = height-30;
    this.a = 180;
this.fire = function(){
    this.x1 = lerp(this.x1, width/2 - 5,0.8);
    this.x2 = lerp(this.x2, width/2 - 5,0.6);
    this.y1 = lerp(this.y1, height/2,0.8);
    this.y2 = lerp(this.y2, height/2,0.6);
    this.a = this.a - 10;
};

this.show = function(){
    stroke(255,0,0,this.a);
    strokeWeight(4);
    line(this.x1,this.y1,this.x2,this.y2);
};
}
function LazerR(){
    this.x1 = width;    
    this.x2 = width-20;
    this.y1 = height;
    this.y2 = height-30;
    this.a = 180;
this.fire = function(){
    this.x1 = lerp(this.x1, width/2 + 5,0.8);
    this.x2 = lerp(this.x2, width/2 + 5,0.6);
    this.y1 = lerp(this.y1, height/2,0.8);
    this.y2 = lerp(this.y2, height/2,0.6);
    this.a = this.a - 10;
};

this.show = function(){
    stroke(255,0,0,this.a);
    strokeWeight(4);
    line(this.x1,this.y1,this.x2,this.y2);
};
}
function Tie(x,y){
    this.x = 0;
    this.xmove = 3;
    this.y = 0;
    this.ymove = 3;
    this.pos = createVector(x,y);
    this.vel = createVector(0,0);
    this.xp = width - 100;
    this.r = 0;
    this.size = 70;
    this.ac = 0;
    this.a = 255;
    this.destroyed = false;
    this.pose = createVector(x,y);
    this.vele = p5.Vector.random2D();
    this.vele.mult(random(2, 10));
    this.update = function(){
        if(this.x+this.pos.x < 0 || this.x+this.pos.x > width|| this.y + this.pos.y < 0 ||this.y + this.pos.y > height){
            this.ac = 100;
        }else{
            this.ac = 0;
        }
        if(random(1) < 0.04){
            this.xmove = this.xmove * -1;
        }
        if(random(1) < 0.04){
            this.ymove = this.ymove * -1;
        }
        var mousevel = createVector(width/2 - mouseX,height/2 - mouseY);
        mousevel.setMag(6);
        this.vel.lerp(mousevel, 0.2);
        this.pos.add(this.vel);
        this.x = this.x + this.xmove;
        this.y = this.y + this.ymove;
        this.xp += 0.1;
    };
    this.hit = function(){
        var d = dist(this.x + this.pos.x,this.y + this.pos.y,width/2,height/2);
        if(d <= 70 && keyIsPressed){ 
            this.xp = this.xp - 50;
        }
    };
    this.explode = function(){
        this.xp = this.xp - 50;
    };
    this.explosion = function(){
        this.destroyed = true;
    };
    this.show = function(){
        push();
        translate(this.pos.x + this.x,this.pos.y + this.y);
        fill(255,0,0,this.ac);
        noStroke();
        ellipse(0,0,1000,1000);
        //rotate(this.angle);
        imageMode(CENTER);
        image(tieimg,0,0,this.size,this.size);
        pop();
        translate(0,0);
        fill(255,0,0,180);
        noStroke();
        rect(40,10,this.xp,20);
    };
}
function setup(){
    createCanvas(windowWidth - 27, windowHeight - 30);
    for(var i = 0; i < 100; i++ ){
        stars.push(new Star(random(0, width), random(0,height)));
    }
    ties.push(new Tie(0,0));
    lazerrs.push(new LazerR());
    lazerls.push(new LazerL());
}
function draw(){
    background(0,255);
    if(random(1) < 0.01 && ties.length < 1){
        ties.push(new Tie(random(-300,-100), random(-300, height + 300)));
    }
    //star background
    for(var i = 0; i < stars.length; i++ ){
        fill(255);
        noStroke();
        stars[i].update();
        stars[i].show();
    }
    //lazers right
    for(i = lazerrs.length-1; i >= 0; i--){
         lazerrs[i].show();
        if (keyIsPressed === true) {
            lazerrs[i].fire();
        }else{
            lazerrs[i].x1 = width;    
            lazerrs[i].x2 = width-20;
            lazerrs[i].y1 = height;
            lazerrs[i].y2 = height-30;
            lazerrs[i].a = 180;
        }
        if(lazerrs[i].x1 == width/2 + 5){
            lazerrs.splice(i,1,new LazerR());
        }
    }
    //lazers left
     for(i = lazerls.length-1; i >= 0; i--){
         lazerls[i].show();
        if (keyIsPressed === true) {
            lazerls[i].fire();
        }else{
            lazerls[i].x1 = 0;    
            lazerls[i].x2 = 20;
            lazerls[i].y1 = height;
            lazerls[i].y2 = height-30;
            lazerls[i].a = 180;
        }  
        if(lazerls[i].x1 == width/2 - 5){
            lazerls.splice(i,1,new LazerL());
        }
    }
    //tie fighters
    for(i = ties.length-1; i >= 0; i--){
        if(ties[i].xp <= 0){
            ties[i].explosion();
            //ties[i].destroyed = true;
        }else{
            ties[i].update();
            ties[i].hit();
            ties[i].show();  
        }
        if(ties[i].destroyed === true){
            //ties.push(new Tie(random(-300,-100), random(-300, height + 300)));
            ties.splice(i,1,new Tie(random(-300,-100), random(-300, height + 300)));
        }
    }
}
