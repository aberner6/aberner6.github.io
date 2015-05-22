/*
*
*
*
*
*
*
*
*
*/


// DATA SCRUBBING

// [1] Clients write out a list of everywhere they have traveled/visited/etc, even if only within the UK. The list format needs to be comma separated, e.g., New York, New York, USA, with each entry on a new line. This can be written in a simple text document.

/* Example:

Oxford, UK
New York, NY
Nairobi, Kenya
Milan, Italy

*/


// [2] Once listed, go to http://www.findlatitudeandlongitude.com/batch-geocode/#instructions and copy and paste into the 'input' box. Select 'include header row in output' in Settings and 'address in, latitude, longitude' in Output.  The results will appear as below:

/* Example:

"name",latitude,longitude
"Oxford, UK",51.751724,-1.255285
"New York, NY",40.7143528,-74.0059731
"Nairobi, Kenya",-1.2920659,36.8219462
"Milan, Italy",45.4654542,9.186516

*/


// [3] We next need to convert the CSV data to JSON. Go to http://www.cparker15.com/code/utilities/csv-to-json/ and copy and paste the geo coded data into the CSV text box and hit 'convert'. The result should be a JSON array. This array should be saved in a file named: data.json in the 'data' directory.


// [4] Use D3 to load the JSON data:
d3.json( 'data.json', function(data) {

    // [5] Convert the data to geoJSON: (see the specification: http://www.geojson.org/geojson-spec.html) --> we have written a utility function for this.
    data = geoJSON( data );


    // [6] Visualize the data using functionality we have already written using D3.js:
    map( data );

});






function map( data ) {

	// Initialize some variables:
	var element = 'div#map';

	var radius = 40,	// px
		hoverRadius = 44; // px

	var features, circles;



	// Create a new canvas:
	var svg = d3.select(element)
		.append('svg:svg')
			.attr('width', '600px')
			.attr('height', '600px'); // full screen


	//Create a base circle: (could use this to color oceans)
    var backgroundCircle = svg.append("svg:circle")
        .attr('cx', getWidth(element)/4)
        .attr('cy', getHeight(element)/4)
        .attr('r', 0)
        .attr('class', 'geo-globe')
        .attr("fill", '#ffffff');


	// Make a <g> tag to group all our countries, which is useful for zoom purposes. (child elements belong to a 'group', which we can zoom all-at-once)
    var world = svg.append('svg:g');
    var zoomScale = 1.3; // default



    // Create the element group to mark individual locations:
    var locations = svg.append('svg:g')
    	.attr('id', 'locations');


    // Define the type of map projection we want: (see https://github.com/mbostock/d3/wiki/Geo-Projections)
    var projection = d3.geo.azimuthal()
		.mode('orthographic')
		.origin([-50.03, -30.63])
		.scale( 150 ) // scale the map
		.translate([getWidth(element)/4, getHeight(element)/4]); // set the center of the map to be the center of the canvas


	// The longitudinal line which goes around the earth and passes through the origin forms a 'great circle'
	var greatCircle = d3.geo.greatCircle()
    	.origin( projection.origin() );




	// Having defined the projection, update the backgroundCircle radius:
	backgroundCircle.attr('r', projection.scale() );



    // Save the path generator for the current projection:
    var path = d3.geo.path()
    	.projection( projection )
    	.pointRadius( function(d,i) {
    		return radius;
    	});

    // Define the function which will 'clip' canvas elements which appear on the backside of the globe. Otherwise, these elements 'show through'
    var clip = function(d) {
	  return path( greatCircle.clip(d) );
	}; // end FUNCTION clip(d)



    // Construct a our world map based on the projection we want:
    d3.json('world-countries2.json', function(collection) { //  ../world-countries2.json lacks Antarctica :-), which is massive when using a mercator projection

		features = world.selectAll('path')
			.data(collection.features)
			.enter()
			.append('svg:path')
				.attr('class', 'geo-path')
				.attr('d', clip); // for an azimuthal projection, we need to remove the elements on the backside of the globe.

		features.append('svg:title')
			.text( function(d) { return d.properties.name; });

	}); // end FUNCTION d3.json








	// Plot the positions on the map:
    circles = locations.selectAll('path')
    	.data(data.features)
    	.enter()
    	.append('svg:path')
    		.attr('class', 'geo-node')
    		.attr('d', clip)
    		.on('mouseover', mouseover)
            .on('mouseout', mouseout);

    circles.append('svg:title')
        .text( function(d) { return d.properties.name; } );








	// Specify a few event handlers to allow globe rotation!
	d3.select(window)
	    .on("mousemove", mousemove)
	    .on("mouseup", mouseup);

	svg.on('mousedown', mousedown);

	// Setup zoom behavior
    var zoom = d3.behavior.zoom(true)
        .translate( projection.origin() )
        .scale( projection.scale() )
        .scaleExtent([100, 800])
        .on("zoom", globeZoom);

    svg.call(zoom)
    	.on('dblclick.zoom', null);




    // MOUSE EVENTS //

    var mousePos, originPos;


    function mouseover(d, i) {

    	path.pointRadius( function(d,i) {
    		return hoverRadius;
    	});

    	// Increase the circle radius, so the user knows she is hovering over this node
        d3.select(this).attr('d', clip);

    }; // end FUNCTION mouseover(d,i)


    function mouseout(d, i) {

    	path.pointRadius( function(d,i) {
    		return radius;
    	});

    	// Reduce the circle radius to its pre-mouseover state:
        d3.select(this).attr('d', clip);


    }; // end FUNCTION mouseout(d,i)


    function mousedown() {

    	// Determine mouse and origin pixel coordinates:
	  	mousePos = [d3.event.pageX, d3.event.pageY];
	  	originPos = projection.origin();

	  	// Prevent the default behavior for mouse down events:
	  	d3.event.preventDefault();

	}; // end FUNCTION mousedown()

	function mousemove() {

		// Has the mouse button been released?
	  	if (mousePos) {

	  		//
	    	var _mousePos = [d3.event.pageX, d3.event.pageY],
	        	_originPos = [originPos[0] + (mousePos[0] - _mousePos[0]) / 8, originPos[1] + (_mousePos[1] - mousePos[1]) / 8];

	    	projection.origin( _originPos );
	    	greatCircle.origin( _originPos );

	    	refresh();
	  };

	}; // end FUNCTION mousemouse()

	function mouseup() {

		// Do we have mouse coordinates?
	  if (mousePos) {

	  	// Yes, so update the map based on the final mouse coordinates and clear the mouse position:
	    mousemove();
	    mousePos = null;

	  };

	}; // end FUNCTION mouseup()



    // Helper functions //

    function refresh(duration) {

    	if (duration) {
    		features.transition()
    			.duration(duration)
    			.attr('d', clip);

    		circles.transition()
    			.duration(duration)
    			.attr('d', clip);

    	}else {
    		features.attr('d', clip);
    		circles.attr('d', clip);
    	}; // end IF/ELSE

	}; // end FUNCTION refresh(duration)




	function globeZoom() {
	    if (d3.event) {
	    	var _scale = d3.event.scale;

	        projection.scale(_scale);
	        backgroundCircle.attr('r', _scale);
	        path.pointRadius( radius );

	        refresh();
    	}; // end IF
    };

    function getWidth( element ) {
        return parseInt( d3.select( element ).style('width'), 10 );
    };

    function getHeight( element ) {
        return parseInt( d3.select( element ).style('height'), 10 );
    };

}; // end FUNCTION map(data)


