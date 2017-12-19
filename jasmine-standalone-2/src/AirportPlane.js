var Plane = function(name) {
  this.name = name;
  this.isFlying = true;
  this.fly = function() {
    if (this.isFlying === true) {
      throw (new Error("Can't fly a flying plane!"));
    };
    this.isFlying = true;
  };
  this.land = function() {
    if (this.isFlying === false) {
      throw (new Error("Can't land a landed plane!"));
    };
    this.isFlying = false;
  };
};

var Airport = function(cap) {
  if (cap === undefined) {
    cap = 20
  }
  this.capacity = cap
  this.planes = []
  // this.isEmpty = (this.planes.length === 0)
  this.landPlane = function(plane) {
    if (this.planes.length < this.capacity) {
      this.planes.push(plane)
      plane.land()
    } else {
      throw (new Error("Cannot land plane while airport is full"))
    }
  }
  this.takeoffPlane = function(plane) {
    var ind = this.planes.indexOf(plane);
    if (ind > -1) {
      plane.fly()
      this.planes.splice(ind, 1);
    } else {
      throw (new Error("Cannot takeoff plane that is not present"))
    }
  }
}

Airport.prototype.isEmpty = function() {
  return (this.planes.length === 0)
}

Airport.prototype.isStormy = function() {
  return (Math.random() <= 0.25)
}
