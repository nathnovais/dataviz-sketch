var table;
//creating array of flights
// we create an array because we use an array-specific function of the elements of the table
var flights = [];

//creating object flight
var flight = function(d,flo,fla,tlo,tla,fc,tc) {
  this.distance = d
  this.from_long = flo
  this.from_lat = fla
  this.to_long = tlo
  this.to_lat = tla
  this.from_country = fc
  this.to_country = tc

  this.departureX = map(this.from_long, -180,180,0,width)
  this.departureY = map(this.from_lat, -90,90,height,0)

  this.selected = function() {
    if ( dist(mouseX, mouseY, this.departureX, this.departureY) < 10 ) {
        return true
    } else {
        return false
    }
  }

  this.drawDepartureAirport = function() {
    if ( this.selected() ) {
      fill(255,0,0,25)
    } else {
      fill(0,0,255,10)
    }
    ellipse(this.departureX, this.departureY, 5,5)
  }
}

function preload() {
  //loading table - file, type of file, argument
  //header indicates that first line of the file is a list of columns
  table = loadTable("flights.csv","csv","header")
}

//code has to run only once
function setup() {
  createCanvas(600,300)
  noStroke()
  //fill(0,0,255,10)
  //OPTMIZATION: as long I dont move the mouse I dont need to redraw the picture
  noLoop()

  fill(255,0,0,50)

  //pushing flights to array
  var rows = table.getRows()
  for ( var i in rows ) {
      var from_airport = rows[i].getString("from_airport")
      var from_city = rows[i].getString("from_city")
      var from_country = rows[i].getString("from_country")
      var from_long = rows[i].getNum("from_long")
      var from_lat = rows[i].getNum("from_lat")
      var to_airport = rows[i].getString("to_airport")
      var to_city = rows[i].getString("to_city")
      var to_country = rows[i].getString("to_country")
      var to_long = rows[i].getNum("to_long")
      var to_lat = rows[i].getNum("to_lat")
      var airline = rows[i].getString("airline")
      var airline_country = rows[i].getString("airline_country")
      var distance = rows[i].getNum("distance")

      var this_flight = new flight(distance, from_long, from_lat, to_long, to_lat, from_country, to_country)
      flights.push(this_flight)
  }
}

//code has to rerun constantly
function draw() {
  //background is in draw because otherwise, the dots would be drawn on top of each other
  background(255,255,255)
  //condition for each flight
  for ( var i in flights ) {
      flights[i].drawDepartureAirport()
    }
}

//OPTIMIZATION: as long I dont move the mouse I dont need to redraw the picture
function mouseMoved() {
  redraw()
  //"Browsers may have different default behaviors attached to various mouse events.
  //To prevent any default behavior for this event, add return false to the end of the method."
  //(P5 reference documentation)
  //return false
}
