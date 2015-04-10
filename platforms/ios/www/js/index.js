var currentLat = -27.518624;
var currentLon = 153.083496;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        navigator.geolocation.getCurrentPosition(
            function(position) {
                currentLat=position.coords.latitude;
                currentLon=position.coords.longitude
                console.log( currentLat+ ',' + currentLon);
            },
            function() {
                alert('Error getting location');
            });

        watch_id = navigator.geolocation.watchPosition(
            function(position){
                currentLat=position.coords.latitude;
                currentLon=position.coords.longitude
                console.log( currentLat+ ',' + currentLon);
            },
            function(error){
                console.log(error);
            },
            { frequency: 3000, enableHighAccuracy: true });
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);


    }
};

app.initialize();