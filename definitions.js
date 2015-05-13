function renderBackground(){
// var projection = d3.geo.mercator()
//     .scale(870)
//     .translate([width/2, 410]);
// var projection = d3.geo.mercator()
//     .scale(135 * height
//     .translate([width / 2, height / 2]);

// var path = d3.geo.path()
//     .projection(projection)

	d3.csv("mid.csv", function(error, data) {
		for (var i=0; i<data.length/50; i++){
			var thisData = data;
        var bcirc = svg.selectAll("path")
            .data(thisData)
            .enter().append("svg:path")
          .datum(function(d) {
          			console.log(d[0])
                return {type: "Point", coordinates: [d[1], d[0]], radius:4 };
          })     
            .attr("class", "b-circ")
            .attr("d",path) 
            .attr("fill","none")
            .attr("stroke","white")
        }

    })
}
// var A = [['x','y','date']];  // initialize array of rows with header row as 1st item
var dataIs = [];
function renderData()
{
// var csvRows = [];

// 	// console.log(data[0].geo.lat);
// 	// dataIs.push(data);

// 	for(var j=1; j<data.length; j++){ 
// 	    A.push([data[j].geo.lon, Date.now()]);
// 	}

// 	var csvRows = [];

// 	for(var i=0, l=A.length; i<l; ++i){
// 	    csvRows.push(A[i].join(','));
// 	}

// 	var csvString = csvRows.join("%0A");
// var a = document.createElement('a');
// a.innerHTML = "Click here";
// 	a.href        = 'data:attachment/csv,' + csvString;
// 	a.target      = '_blank';
// 	a.download    = 'myFile.csv';

// 	document.body.appendChild(a);
// 	a.click();





	var innerCircs = svg.selectAll("innerCircs").data(data);
	var outerCircs = svg.selectAll("outerCircs").data(data);



	var now = Date.now();
	var limit = eventWindow;

	outerCircs.enter().append("circle")
        .attr("stroke", function(d){
			return d.color;
		})
        .attr("fill","none")
		.attr("r",0)
		.attr("opacity",0)
		.attr("stroke-width",3)

	innerCircs.enter().append("circle")
        .attr("fill", function(d){
			return d.color;
		})
        .attr("stroke", function(d){
			return d.color;
		})
		.attr("r",2)
		.attr("opacity",0)
        .attr("cx", function(d) { return d.projection[0]; })
        .attr("cy", function(d) { return d.projection[1]; })
		.transition()
		.duration(1000)
		.attr("opacity",1)
		// .attr("fill","white")
		// .attr("stroke","white")

    outerCircs
        .attr("cx", function(d) { return d.projection[0]; })
        .attr("cy", function(d) { return d.projection[1]; })
		.transition()
		.duration(2000)
		.attr("r",20)
		.attr("opacity",1)
		.attr("stroke-width",.1)
		.transition()
		.duration(2100)
		.each("end", function(d,i){
			// d3.select(this)
			// .transition()
			// .duration(2000)
			// .attr("stroke","black")
			// .each("end", function(d,i){
				d3.select(this)	
				.remove();			
			// })
		})
}

function setTimeZone()
{
	var now = new Date();

	lat_tz.forEach(function(d) {
		var hour = now.getHours() - (-1*now.getTimezoneOffset()/60) + d.tz;
		if (hour >= 24) hour -= 24;
		if (hour < 0) hour += 24;
    	d.hour = hour;
		d.day = (hour > 8 && hour < 20);
    });



















// var w = 960,
//     h = 500;

// var gradient = svg.append("svg:defs")
//   .append("svg:linearGradient")
//     .attr("id", "gradient")
//     .attr("x1", "0%")
//     .attr("y1", "0%")
//     .attr("x2", "100%")
//     .attr("y2", "100%")
//     .attr("spreadMethod", 'reflect');

// gradient.append("svg:stop")
//     .attr("offset", "10%")
//     .attr("stop-color", "darkblue")
//     .attr("stop-opacity", .4);

// gradient.append("svg:stop")
//     .attr("offset", "80%")
//     .attr("stop-color", "lightblue")
//     .attr("stop-opacity", .4);

// gradient.append("svg:stop")
//     .attr("offset", "20%")
//     .attr("stop-color", "lightblue")
//     .attr("stop-opacity", .4);

// gradient.append("svg:stop")
//     .attr("offset", "90%")
//     .attr("stop-color", "darkblue")
//     .attr("stop-opacity", .5);

// svg.append("svg:rect")
//     .attr("width", 1440)
//     .attr("height", 40)
//     .style("fill", "url(#gradient)");



















	var tzs = svg.selectAll("rect").data(lat_tz);
	tzs.enter().append("rect")
		.attr('x',function(e){
			return e.x;
		})
		.attr('y',0)
		.attr('width',function(e){
			return e.width;
		})
		.attr('height',height)
		.attr('stroke-width','.1')
    .style("stroke-dasharray", "1,4")
		.attr('stroke','lightgray')
		.attr("opacity",1)

	tzs.attr("fill-opacity", 1)
	.attr("fill","none")
		// .attr('fill','#b5f8ff');

	// var tz_labels = svg.selectAll("text.tz").data(lat_tz);
	// tz_labels.enter().append("text")
	// 	.attr('class','tz')
	// 	.style("text-anchor", "middle")
	// 	.style("font-size", "10px")
	// 	.attr('fill', 'grey')
	// 	.attr("x", function(e){
	// 		return e.x + e.width / 2;
	// 	})
	// 	.attr("y", 20);

	// tz_labels.text(function(e){return e.tz;});

	var tz_hours = svg.selectAll("text.tzh").data(lat_tz);
	tz_hours.enter().append("text")
		.attr('class','tzh')
		.style("text-anchor", "middle")
		.style("font-size", "10px")
		.attr('fill', 'gray')
		.attr("x", function(e){
			return e.x + e.width / 2;
		})
		.attr("y", 20);

	tz_hours.text(function(e){return e.hour;});

//if it is daytime, add a sun
            var suns = svg.selectAll("img").data(lat_tz);
                suns.enter()
            	.append("svg:image")
                .attr("xlink:href", "/sun.png")
				.attr("x", function(e){
					return e.x + (e.width / 2)-8;
				})
		        .attr("y", "27")
                .attr("width", "8")
                .attr("height", "8")
                .attr("opacity",.5)

            var moons = svg.selectAll("img").data(lat_tz);
                moons.enter()
            	.append("svg:image")
                .attr("xlink:href", "/moon.png")
				.attr("x", function(e){
					return e.x + (e.width / 2) -3;
				})
		        .attr("y", "30")
                .attr("width", "8")
                .attr("height", "8")
                .attr("opacity",.5)



	svg.selectAll("path").moveToFront();
	svg.selectAll("text").moveToFront();
	svg.selectAll("circle").moveToFront();

}

var names = [];
var uniqueNames = [];
function loadPoint(point)
{
	names.push(point.strategy);

$.each(names, function(i, el){
    if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
});

	if (!strategies[point.strategy]) {
		strategies[point.strategy] = {
			color:colors(lastColorIndex),
			count:0,
			name:point.strategy
		};
		lastColorIndex++;
	}

	strategies[point.strategy].count++;

	point.color = strategies[point.strategy].color
	point.color = strategies[point.strategy].color
	point.type = point.strategy;
	point.created_at = Date.now();

	point.projection = projection([point.geo.lng, point.geo.lat]);
	data.push(point);
	// console.log(data);
	renderData();
	//renderStrategies();
}


function antipode(position) {
  return [position[0] + 180, -position[1]];
}

function solarPosition(time) {
  var centuries = (time - Date.UTC(2000, 0, 1, 12)) / 864e5 / 36525, // since J2000
      longitude = (d3.time.day.utc.floor(time) - time) / 864e5 * 360 - 180;
  console.log([longitude - equationOfTime(centuries) * degrees,
    solarDeclination(centuries) * degrees])
  return [
    longitude - equationOfTime(centuries) * degrees,
    solarDeclination(centuries) * degrees
  ];

}

// Equations based on NOAA’s Solar Calculator; all angles in radians.
// http://www.esrl.noaa.gov/gmd/grad/solcalc/

function equationOfTime(centuries) {
  var e = eccentricityEarthOrbit(centuries),
      m = solarGeometricMeanAnomaly(centuries),
      l = solarGeometricMeanLongitude(centuries),
      y = Math.tan(obliquityCorrection(centuries) / 2);
  y *= y;
  return y * Math.sin(2 * l)
      - 2 * e * Math.sin(m)
      + 4 * e * y * Math.sin(m) * Math.cos(2 * l)
      - 0.5 * y * y * Math.sin(4 * l)
      - 1.25 * e * e * Math.sin(2 * m);
}

function solarDeclination(centuries) {
  return Math.asin(Math.sin(obliquityCorrection(centuries)) * Math.sin(solarApparentLongitude(centuries)));
}

function solarApparentLongitude(centuries) {
  return solarTrueLongitude(centuries) - (0.00569 + 0.00478 * Math.sin((125.04 - 1934.136 * centuries) * radians)) * radians;
}

function solarTrueLongitude(centuries) {
  return solarGeometricMeanLongitude(centuries) + solarEquationOfCenter(centuries);
}

function solarGeometricMeanAnomaly(centuries) {
  return (357.52911 + centuries * (35999.05029 - 0.0001537 * centuries)) * radians;
}

function solarGeometricMeanLongitude(centuries) {
  var l = (280.46646 + centuries * (36000.76983 + centuries * 0.0003032)) % 360;
  return (l < 0 ? l + 360 : l) / 180 * π;
}

function solarEquationOfCenter(centuries) {
  var m = solarGeometricMeanAnomaly(centuries);
  return (Math.sin(m) * (1.914602 - centuries * (0.004817 + 0.000014 * centuries))
      + Math.sin(m + m) * (0.019993 - 0.000101 * centuries)
      + Math.sin(m + m + m) * 0.000289) * radians;
}

function obliquityCorrection(centuries) {
  return meanObliquityOfEcliptic(centuries) + 0.00256 * Math.cos((125.04 - 1934.136 * centuries) * radians) * radians;
}

function meanObliquityOfEcliptic(centuries) {
  return (23 + (26 + (21.448 - centuries * (46.8150 + centuries * (0.00059 - centuries * 0.001813))) / 60) / 60) * radians;
}

function eccentricityEarthOrbit(centuries) {
  return 0.016708634 - centuries * (0.000042037 + 0.0000001267 * centuries);
}
