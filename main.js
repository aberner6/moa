d3.selection.prototype.moveToFront = function() {
	return this.each(function(){
		this.parentNode.appendChild(this);
	});
};

var data = []
, realWidth = 0
, width = null
, originalWidth = null
, height = 0
, π = Math.PI
, radians = π / 180
, degrees = 180 / π
, pusher = null
, channel = null
, eventWindow = 1 * 60 * 1000;

var colors = d3.scale.category20();
var strategies = {};
var lastColorIndex = 0;

var circle = d3.geo.circle().angle(90);

var svgEl = d3.select(".map svg");
var svg = svgEl.append('g');

function resizeGraph(){
   	realWidth = document.body.clientWidth;
   	width = realWidth;
	height = width;

	svgEl.attr("width", width).attr("height", height);
}
resizeGraph();

var projection = d3.geo.mercator()
    .scale(175 * height / 847)
    .translate([width / 2, height / 2.8]);
/*
var projection = d3.geo.equirectangular()
    .translate([width / 2, height / 2])
    .scale(135 * height / 847)
    .precision(.1);
*/
var path = d3.geo.path().projection(projection);


var lat_tz = d3.range(-180,180,15).map(function (lat){
	var tz = Math.floor(lat / 15)+1;
	var from = projection([lat,0]);
	var to = projection([lat+15,0]);
	return {
		tz: tz,
		latitude: lat,
		width: to[0] - from[0],
		x: from[0]
	};
});


d3.json("world.json", function(error, world) {
	svg.append("path")
		.classed('world', true)
		.datum( topojson.feature(world, world.objects.land) )
		.attr("d", path)
		.attr("stroke","grey")
		.attr("stroke-width",.5)
		.attr("fill","none")

	// var night = svg.append("path")
 //      .attr("class", "night")
 //      .attr("d", path)
 //      .attr("opacity",.2);

// renderBackground();
	redraw();
	setInterval(redraw, 5 * 60 * 1000);

	function redraw() {
	var night = svg.append("line")
      .attr("class", "night")
      .attr("y1",0)
      .attr("y2",1300)
      .attr("fill","black")
      .attr("stroke","black")
      .attr("opacity",1)
		// .attr("x1",(circle.origin(antipode(solarPosition(new Date))))[1])
		// .attr("x2",(circle.origin(antipode(solarPosition(new Date))))[1]);

		// night.datum(circle.origin(antipode(solarPosition(new Date)))).attr("d", path);
		


		// setTimeZone();
	}

	// Pusher.log = function(message) {
	// 	console.log(message);
	// };

	pusher = new Pusher('54da1f9bddbf14929983');
	channel = pusher.subscribe('world_map');
		// console.log(channel)
	channel.bind('login', function(point) {
		// console.log(point)

		loadPoint(point);
	});

	// d3.json("data.json", function(error, points) {
	// 	points.forEach(function(p){
	// 		loadPoint(p);
	// 	});
	// });

});

d3.select(self.frameElement).style("height", height + "px");

// window.onresize = resizeGraph;

setInterval(function(){
	var limit = Date.now() - eventWindow;

	data = _.filter(data, function(d){
		return d.created_at > limit;
	})
}, 1000)
