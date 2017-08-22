// Start point
var s_lat = 37.5180;
var s_lng = 139.9362;
// Goal point
var g_lat = 0;
var g_lng = 0;
// Waypoint 1
var wp1_lat = 0;
var wp1_lng = 0;
// Waypoint 2
var wp2_lat = 0;
var wp2_lng = 0;

// Set goal point
g_lat = s_lat + 0.01;
g_lng = s_lng + 0.01;
// Set waypoint 1
wp1_lat = s_lat + 0.01;
wp1_lng = s_lng - 0.01;
// Set waypoint 2
wp2_lat = s_lat - 0.01;
wp2_lng = s_lng - 0.01;
// Set waypoint 3
wp3_lat = s_lat - 0.01;
wp3_lng = s_lng + 0.01;

var wps = [
    [wp1_lat, wp1_lng],
    [wp2_lat, wp2_lng],
    [wp3_lat, wp3_lng],
];


// window.onload = function(){ DoFunctions() };
window.addEventListener('load', function() {
    var map = new GMaps({
        div: "#map-1",             // 地図を表示するdiv要素のid
        lat: s_lat,                // latitude
        lng: s_lng,                // longitude
        zoom: 15,                  // scale (1 to 21)
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        // overviewMapControl: false,
        panControl: false,
        scaleControl: false,
        zoomControl: false,
        mapTypeControl: false,     // disable map type control
        streetViewControl: false,  // disable street view
        fullscreenControl: false,  // disable full screen controller
        gestureHandling: "cooperative",   // ドラッグ操作を二本指じゃないとできない。ページのスクロールを邪魔しない
        // scrollwheel: false,     // disable zoom

        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#242f3e"
                    }
                ]
            },
            {
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#746855"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#242f3e"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#d59563"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#d59563"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#263c3f"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#6b9a76"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#38414e"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#212a37"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9ca5b3"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#746855"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#1f2835"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#f3d19c"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#2f3948"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#d59563"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#17263c"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#515c6d"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#17263c"
                    }
                ]
            }
        ]
    });

    // Put start sarker
    map.addMarker({
        lat: s_lat,
        lng: s_lng,
        title: 'Start point',  // title of marker
        infoWindow: {
            content: '<h4>Start point</h4><ul><li>現在地がスタート地点になります。</li><li>このようにHTMLで埋め込むことが可能。</li></ul>'  // add info
        },
        click: function(e) {
            this.infoWindow.open(this.map, this);
            //alert('hongege'); // When click marker
        },
        icon: 'image/enter.png',
        animation: google.maps.Animation.BOUNCE,
        //animation: google.maps.Animation.DROP,
        //clickable: false,
    });

    // Put goal marker
    map.addMarker({
        lat: g_lat,
        lng: g_lng,
        title: 'Goal point',  // title of marker
        infoWindow: {
            content: '<h4>Goal point</h4><ul><li>ここがゴール地点になります。</li><li>このようにHTMLで埋め込むことが可能。</li></ul>'  // add info
        },
        click: function(e) {
            this.infoWindow.open(this.map, this);
            //alert('hongege'); // When click marker
        },
        icon: '../image/exit.png',
        animation: google.maps.Animation.BOUNCE,
        //animation: google.maps.Animation.DROP,
        //clickable: false,
    });

    // Put waypoint-1 marker
    map.addMarker({
        lat: wp1_lat,
        lng: wp1_lng,
        title: 'Waypoint 1',  // title of marker
        infoWindow: {
            content: '<h4>Waypoint 1</h4><ul><li>アイテムの配置やルートの指定を経由地点の指定に見立てればうまく実装できそう。</li></ul><a href="../image/ghost_4.jpg" target="_blank">Preview</a>'  // add info
        },
        click: function(e) {
            this.infoWindow.open(this.map, this);
            //alert('hongege'); // When click marker
        },
        icon: '../image/item_1.png',
        //animation: google.maps.Animation.BOUNCE,
        animation: google.maps.Animation.DROP,
        //clickable: false,
        //cursor: "url(./../image/ghost_3.jpg), auto" ,
    });

    // Put waypoint-2 marker
    map.addMarker({
        lat: wp2_lat,
        lng: wp2_lng,
        title: 'Waypoint 2',  // title of marker
        infoWindow: {
            content: '<h4>Waypoint 2</h4><ul><li>アイテムの配置やルートの指定を経由地点の指定に見立てればうまく実装できそう。</li></ul>'  // add info
        },
        click: function(e) {
            this.infoWindow.open(this.map, this);
            //alert('hongege'); // When click marker
        },
        icon: '../image/item_2.png',
        //animation: google.maps.Animation.BOUNCE,
        animation: google.maps.Animation.DROP,
        //clickable: false,
    });

    // Put waypoint-3 marker
    map.addMarker({
        lat: wp3_lat,
        lng: wp3_lng,
        title: 'Waypoint 3',  // title of marker
        infoWindow: {
            content: '<h4>Waypoint 3</h4><ul><li>アイテムの配置やルートの指定を経由地点の指定に見立てればうまく実装できそう。</li></ul>'  // add info
        },
        click: function(e) {
            this.infoWindow.open(this.map, this);
            //alert('hongege'); // When click marker
        },
        icon: '../image/item_3.png',
        //animation: google.maps.Animation.BOUNCE,
        animation: google.maps.Animation.DROP,
        //clickable: false,
    });

    // Print route
    map.drawRoute({
        origin: [s_lat, s_lng],       // 出発地点の座標: Start point
        destination: [g_lat, g_lng],  // 到着地点の座標: Goal point
        // waypoint
        waypoints: [{location: new google.maps.LatLng(wp1_lat, wp1_lng)}, {location: new google.maps.LatLng(wp2_lat, wp2_lng)}, {location: new google.maps.LatLng(wp3_lat, wp3_lng)}],
        travelMode: 'walking',        // 移動手段: 徒歩
        strokeColor: '#71ff71',       // ルートラインの色:     green
        strokeOpacity: 0.5,           // ルートラインの透明度: [0.0, 1.0]
        strokeWeight: 3,              // ルートラインの太さ:   integer
    });


    $('#start_travel0').click(function(e){

        var cnt = 0;
        var intervalTime = 15000;

        e.preventDefault();
        $('#instructions').empty();
        map.travelRoute({
            origin: [s_lat, s_lng],       // 出発地点の座標: Start point
            destination: [wp1_lat, wp1_lng],  // 到着地点の座標: Goal point
            travelMode: 'walking',        // 移動手段: 徒歩
            step: function(e){
                $('#instructions').append('<li>'+e.instructions+'</li>');
                $('#instructions li:eq('+e.step_number+')').delay(1000*e.step_number).fadeIn(200, function(){
                    map.setCenter(e.end_location.lat(), e.end_location.lng());
                    map.drawPolyline({
                        path: e.path,
                        strokeColor: '#ff0000',       // ルートラインの色:     red
                        strokeOpacity: 1.0,           // ルートラインの透明度: [0.0, 1.0]
                        strokeWeight: 4,              // ルートラインの太さ:   integer
                    });
                });
            }
        });

        var timer = setInterval(function(){
            //do something
            console.log("do something");

            e.preventDefault();
            $('#instructions').empty();
            map.travelRoute({
                origin: [wps[cnt][0], wps[cnt][1]],       // 出発地点の座標: Start point
                destination: [wps[cnt + 1][0], wps[cnt + 1][1]],  // 到着地点の座標: Goal point
                travelMode: 'walking',        // 移動手段: 徒歩
                step: function(e){
                    $('#instructions').append('<li>'+e.instructions+'</li>');
                    $('#instructions li:eq('+e.step_number+')').delay(1000*e.step_number).fadeIn(200, function(){
                        map.setCenter(e.end_location.lat(), e.end_location.lng());
                        map.drawPolyline({
                            path: e.path,
                            strokeColor: '#ff0000',       // ルートラインの色:     red
                            strokeOpacity: 1.0,           // ルートラインの透明度: [0.0, 1.0]
                            strokeWeight: 4,              // ルートラインの太さ:   integer
                        });
                    });
                }
            });

            if (cnt > wps.length - 2) {
                clearInterval(timer);
            }

            cnt++;

        }, intervalTime);

        var timer = setInterval(function(){

            e.preventDefault();
            $('#instructions').empty();
            map.travelRoute({
                origin: [wp3_lat, wp3_lng],       // 出発地点の座標: Start point
                destination: [g_lat, g_lng],  // 到着地点の座標: Goal point
                travelMode: 'walking',        // 移動手段: 徒歩
                step: function(e){
                    $('#instructions').append('<li>'+e.instructions+'</li>');
                    $('#instructions li:eq('+e.step_number+')').delay(1000*e.step_number).fadeIn(200, function(){
                        map.setCenter(e.end_location.lat(), e.end_location.lng());
                        map.drawPolyline({
                            path: e.path,
                            strokeColor: '#ff0000',       // ルートラインの色:     red
                            strokeOpacity: 1.0,           // ルートラインの透明度: [0.0, 1.0]
                            strokeWeight: 4,              // ルートラインの太さ:   integer
                        });
                    });
                }
            });

            clearInterval(timer);
        }, intervalTime * 3);
    });


    //    map.fitZoom();
});
