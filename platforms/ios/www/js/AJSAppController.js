var indi = true;
/**
 Controller for the complete App
 @param  $scope
 @param  $http
 */
module.controller('AppController', function ($scope, $http, $interval) {


    var zoom=12;

        $scope.closestEvents=[[]];
        $scope.defaultDistanceToReport=7;
        $scope.refreshTime=600000;
        $scope.totalEvents=0;



        //Default Map initialisation
        $scope.map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ]
        });

        /**
         Function to query and draw the current location of the device using OSM using a predefined map.
         @param  map
         */
        $scope.currentLocation = function (map) {


            //For the first time instatiation of the feature
            console.log(currentLon+";"+ currentLat);
            $scope.circle = new ol.geom.Circle(
                ol.proj.transform([currentLon, currentLat], 'EPSG:4326', 'EPSG:3857'),
                $scope.defaultDistanceToReport*1000
            );
            $scope.circle2 = new ol.geom.Circle(
                ol.proj.transform([currentLon, currentLat], 'EPSG:4326', 'EPSG:3857'),
                $scope.defaultDistanceToReport*10000/(zoom*zoom*zoom)
            );



            //if(currentLat !== 0 && currentLon !== 0)
            {

    if (indi) {
        $scope.myView = new ol.View({
            center: ol.proj.transform([currentLon, currentLat], 'EPSG:4326', 'EPSG:3857'),
            zoom: zoom
        });
        indi = false;
    } else {
        console.log("Func:" + currentLon + ";" + currentLat)
        zoom=$scope.map.getView().getZoom();
        $scope.vlArea.getSource().clear();
        $scope.vlPosition.getSource().clear();
    }
                $scope.vlArea=createCircle($scope.map, $scope.circle, 'rgba(191, 235, 246, 0.3)','rgba(255, 100, 50, 0.8)');
                $scope.vlPosition = createCircle($scope.map, $scope.circle2, 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.8)');
                $scope.map.addLayer($scope.vlArea);
                $scope.map.addLayer($scope.vlPosition);
                $scope.map.setView($scope.myView);
}

        };

        //To update the map according to the current location.
        var intervalId = setInterval(function () {
            $scope.currentLocation($scope.map);
        }, 3000);









});




var createCircle=function(map, circle, innerColor,border){

    circleFeature = new ol.Feature(circle);
    vs = new ol.source.Vector({
        projection: 'EPSG:4326',
        features: [circleFeature]
    });
    style = new ol.style.Style({
        fill: new ol.style.Fill({
            color: innerColor
        }),
        stroke: new ol.style.Stroke({
            width: 2,
            color: border
        }),
        image: new ol.style.Circle({
            fill: new ol.style.Fill({
                color: 'rgba(191, 235, 246, 0.5)'
            }),
            stroke: new ol.style.Stroke({
                width: 1,
                color: 'rgba(55, 200, 150, 0.8)'
            }),
            radius: 7
        })
    });

    vl = new ol.layer.Vector({
        source: vs,
        style: style
    });

    return vl;

}
