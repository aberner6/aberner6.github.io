/**
*
*
*
*
*
*
*
*
*/


// Utility to convert JSON to geoJSON (see the geoJSON specification)
function geoJSON( data ) {
    //
    // Data format:
    //  name: ''
    //  latitude: NUM
    //  longitude: NUM
    //

    // Convert data to GeoJSON format:
    var _data = {
            'type': 'FeatureCollection',
            'features': [ ]
        };

    ;

// Begin injected loop protection init
var __DECODED_TIMER_1t = Date.now();
var __DECODED_ITERATIONS_1t = 0;
// End injected loop protection init

for (var i = 0; i < data.length; i++) {
        _data.features.push( {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [data[i].longitude, data[i].latitude] // [x,y]
            },
            'properties': {
                'name': data[i].name
            }
        });;

// Begin injected loop protection
++__DECODED_ITERATIONS_1t;
if ((__DECODED_ITERATIONS_1t > 50) && (Date.now() - __DECODED_TIMER_1t > 100)) {
  if (confirm("Uh oh! Looks like you've got an infinite loop on line 28. Do you want to stop it?")) {
    break;
  } else {
    __DECODED_TIMER_1t = Date.now();
    __DECODED_ITERATIONS_1t = 0;
  }
};
// End injected loop protection


    }; // end FOR i

    return _data;

}; // end FUNCTION geoJSON(data)