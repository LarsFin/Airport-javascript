describe("Plane", function() {

  var testPlane
  var testAirport

  beforeEach(function() {
    testPlane = new Plane('Barry');
    testAirport = new Airport()
  });

  it("Should begin landed", function() {
    expect(testPlane.isFlying).toBe(true);
  });

  it("Should be able to fly a plane", function() {
    testPlane.land();
    testPlane.fly();
    expect(testPlane.isFlying).toBe(true);
  });

  it("Should be able to land a plane", function() {
    testPlane.land();
    expect(testPlane.isFlying).toBe(false);
  });

  it("Should throw an error if attempting to a fly a flying plane", function() {
    expect(function() {testPlane.fly()}).toThrow(new Error("Can't fly a flying plane!"))
  })

  it("Should throw an error if attempting to a land a landed plane", function() {
    testPlane.land()
    expect(function() {testPlane.land()}).toThrow(new Error("Can't land a landed plane!"))
  })

});

describe("Airport", function() {

  var testPlane
  var testAirport
  var testAirport2
  var spyPlane
  var enigma

  beforeEach(function() {
    testPlane = new Plane('Barry');
    testPlane2 = new Plane('Uncle Rick');
    testAirport = new Airport()
    spyPlane = jasmine.createSpyObj('spyPlane', ['fly', 'land'])
    Math = {
      random: function() {
        return 0.3
      }
    }
  });

  it("Should hold no planes initially", function() {
    expect(testAirport.planes.length).toEqual(0);
  });

  it("Should be able store planes", function() {
    testAirport.landPlane(testPlane);
    expect(testAirport.planes[0]).toEqual(testPlane)
  });

  it("Should land the planes", function() {
    testAirport.landPlane(testPlane);
    expect(testAirport.planes[0].isFlying).toBe(false)
  });

  it("Should check that land has been called", function() {
    testAirport.landPlane(spyPlane);
    expect(spyPlane.land).toHaveBeenCalled()
  });

  it("An airport with no planes should be empty and vice versa", function() {
    expect(testAirport.isEmpty()).toBe(true);
  })

  it("An airport with no planes should be empty and vice versa", function() {
    testAirport.landPlane(testPlane);
    expect(testAirport.isEmpty()).toBe(false);
  })

  it("Should be able take off planes", function() {
    testAirport.landPlane(testPlane);
    testAirport.takeoffPlane(testPlane);
    expect(testAirport.isEmpty()).toBe(true)
  });

  it("Should check that takeoff has been called", function() {
    testAirport.landPlane(spyPlane);
    testAirport.takeoffPlane(spyPlane);
    expect(spyPlane.fly).toHaveBeenCalled()
  });

  it("Should be able take off only the plane you specify", function() {
    testAirport.landPlane(testPlane);
    testAirport.landPlane(testPlane2);
    testAirport.takeoffPlane(testPlane);
    expect(testAirport.planes[0]).toEqual(testPlane2)
  });

  it("Should throw an error if attempting to a takeoff a plane that is not present", function() {
    expect(function() {testAirport.takeoffPlane(testPlane)}).toThrow(new Error("Cannot takeoff plane that is not present"))
  });

  it("Should throw an error if attempting to land a plane when the airport is full", function() {
    for(var n = 0; n < testAirport.capacity; n++) {
      testAirport.landPlane(new Plane);
    }
    expect(function() {testAirport.landPlane(testPlane)}).toThrow(new Error("Cannot land plane while airport is full"))
  });

  it("Should be able to set a new capacity", function(){
    var testAirport5 = new Airport(5)
    expect(testAirport5.capacity).toEqual(5)
  });

  it("Weather can be stormy", function(){
    Math = {
      random: function() {
        return 0.1
      }
    }
    expect(testAirport.isStormy()).toEqual(true)
  });

  it("Weather should not be stormy sometimes", function(){
    expect(testAirport.isStormy()).toEqual(false)
  });

});
