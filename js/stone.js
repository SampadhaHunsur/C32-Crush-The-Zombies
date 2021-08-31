class Stone{
    constructor(x, y) 
  {
    let options = {
     isStatic:true
    };
    this.r = 40;

    this.body = Bodies.circle(x, y, this.r, options);
    World.add(world, this.body);

  }
  show() {
    let pos = this.body.position;
    push();
    rectMode(CENTER);
    noStroke();
    fill(148,127,146);
    circle(pos.x, pos.y, 0,0, this.r, this.r)
    pop();
  }
    
}