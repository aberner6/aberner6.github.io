<script type="text/javascript" charset="utf-8"> 
    //*********************************************************    
    // Geolocation Capabilities
    //*********************************************************
    var geolocationInt;
    
    function updateGeolocationStatus(status) {
        $("#geolocationStatus").empty();
        $("#geolocationStatus").append(status);
    }
    
    function geolocationSuccess(position) {
        $("#geolocationProperties").empty();
        
        $("#geolocationProperties").append(addGridRow("a", boldLabel("Latitude:")));          
        $("#geolocationProperties").append(addGridRow("b", textFormat(position.coords.latitude)));
        
        $("#geolocationProperties").append(addGridRow("a", boldLabel("Longitude:")));         
        $("#geolocationProperties").append(addGridRow("b", textFormat(position.coords.longitude)));
        
        $("#geolocationProperties").append(addGridRow("a", boldLabel("Altitude:")));          
        $("#geolocationProperties").append(addGridRow("b", textFormat(position.coords.altitude)));
        
        $("#geolocationProperties").append(addGridRow("a", boldLabel("Accuracy:")));          
        $("#geolocationProperties").append(addGridRow("b", textFormat(position.coords.accuracy)));
        
        $("#geolocationProperties").append(addGridRow("a", boldLabel("Altitude Accuracy:"))); 
        $("#geolocationProperties").append(addGridRow("b", textFormat(position.coords.altitudeAccuracy)));
        
        $("#geolocationProperties").append(addGridRow("a", boldLabel("Heading:")));           
        $("#geolocationProperties").append(addGridRow("b", textFormat(position.coords.heading)));
        
        $("#geolocationProperties").append(addGridRow("a", boldLabel("Speed:")));             
        $("#geolocationProperties").append(addGridRow("b", textFormat(position.coords.speed)));
        
        $("#geolocationProperties").append(addGridRow("a", boldLabel("Timestamp:"))); 
        $("#geolocationProperties").append(addGridRow("b", toDateStr(new Date(position.timestamp))));
            
    }
    function geolocationError(error) {
        $("#geolocationProperties").append(addGridRow('a', boldLabel("ERROR:")));
        $("#geolocationProperties").append(addGridRow('b', error.message + " Code: " + error.code));
        updateGeolocationStatus("ERROR");
    } 

    function getGeolocationInfo() {
        if ( geolocationInt != undefined ) {
            navigator.geolocation.clearWatch(geolocationInt);
        }
        if ( $("#geolocFreq").val() != 1 ) {
            $("#geolocFreq").val(1).slider("refresh");
        }
        
        navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, {enableHighAccuracy:true, timeout:5000});
        updateGeolocationStatus("Initialized");     
    }
    
    function updateGeolocation() {
        if ( geolocationInt != undefined ) {
            navigator.geolocation.clearWatch(geolocationInt);
        }
        
        var uDefFreq = $("#geolocFreq").val();
        
        if ( uDefFreq > 0 ) {
            // The Android 2.x simulators will not return a geolocation result unless the enableHighAccuracy option is set to true. 
            geolocationInt = navigator.geolocation.watchPosition(geolocationSuccess, geolocationError, {enableHighAccuracy:true, timeout:5000, maximumAge: uDefFreq * 1000});
        }
        updateGeolocationStatus("Updating... Frequency: " + uDefFreq + " sec");
    }
    
    function stopUpdateGeolocation() {
        navigator.geolocation.clearWatch(geolocationInt);
        geolocationInt = undefined;
        updateGeolocationStatus("Stopped");
    }
</script>