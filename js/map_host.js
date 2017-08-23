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

var wait_geolocat = 1;  // 1: wait, 0: you can go to next

// Get you are here function
function GetCurrentLocation() {
    GMaps.geolocate({
        success: function(position){
            //map.setCenter(position.coords.latitude, position.coords.longitude);
            s_lat = position.coords.latitude;
            s_lng = position.coords.longitude;
            wait_geolocat = 0;
        },
        error: function(error){
            alert('Geolocation failed: ' + error.message);
        },
        not_supported: function(){
            alert("Your browser does not support geolocation");
        }
    });
}

// Init map function
function InitMap() {

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

        styles: map_style
    });

    map.setContextMenu({
        control: 'map',
        options: [{
            title: 'Add item',
            name: 'add_item',
            action: function(e) {
                // Put waypoint-i marker
                this.setCenter(e.latLng.lat(), e.latLng.lng());
                var marker = this.addMarker({
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                    title: 'Waypoint 1',  // title of marker
                    infoWindow: {
                        content: '<h4>Waypoint 1</h4><ul><li>Item 1</li></ul>'  // add info
                    },
                    click: function(e) {
                        this.infoWindow.open(this.map, this);
                        //alert('hongege'); // When click marker
                    },
                    dblclick: function(e) {
                        // アイテムをダブルクリックでページのリロード
                        location.reload();
                    },
                    icon: '../image/item_1.png',
                    //animation: google.maps.Animation.BOUNCE,
                    animation: google.maps.Animation.DROP,
                    //clickable: false,
                    //cursor: "url(./../image/ghost_3.jpg), auto" ,
                });

                // 配列に以下を代入する必要あり todo
                console.log(e.latLng.lat());
                console.log(e.latLng.lng());
            }
        }, {
            title: 'Add goal',
            name: 'add_goal',
            action: function(e) {
                this.setCenter(e.latLng.lat(), e.latLng.lng());
                g_lat =  e.latLng.lat(),
                g_lng =  e.latLng.lng(),
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
                    dblclick: function(e) {
                        // アイテムをダブルクリックでページのリロード
                        location.reload();
                    },
                    icon: '../image/exit.png',
                    animation: google.maps.Animation.BOUNCE,
                    //animation: google.maps.Animation.DROP,
                    //clickable: false,
                });
            }
        }, {
            title: 'Add start',
            name: 'add_start',
            action: function(e) {
                this.setCenter(e.latLng.lat(), e.latLng.lng());
                s_lat =  e.latLng.lat(),
                s_lng =  e.latLng.lng(),
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
                    dblclick: function(e) {
                        // アイテムをダブルクリックでページのリロード
                        location.reload();
                    },
                    icon: '../image/enter.png',
                    animation: google.maps.Animation.BOUNCE,
                    //animation: google.maps.Animation.DROP,
                    //clickable: false,
                });
            }
        }, {
            title: 'Center here',
            name: 'center_here',
            action: function(e) {
                this.setCenter(e.latLng.lat(), e.latLng.lng());
            }
        }]
    });

    // 右上に現在地を取得するボタンを設置
    map.addControl({
        position: 'top_right',
        content: 'You are here',
        style: {
            margin: '20px',
            padding: '1px 6px',
            border: 'solid 1px #717B87',
            background: '#fff'
        },
        events: {
            click: function() {
                GMaps.geolocate({
                    success: function(position){
                        map.setCenter(position.coords.latitude, position.coords.longitude);
                    },
                    error: function(error){
                        alert('Geolocation failed: ' + error.message);
                    },
                    not_supported: function(){
                        alert("Your browser does not support geolocation");
                    }
                });
            }
        }
    });
    return map;
}

// Add marker function
function addMarkerFunc( map, lat, lng, title, content, ani, icon ) {
    map.addMarker({
        lat: lat,
        lng: lng,
        title: title,         // title of marker
        infoWindow: {
            content: content  // add info
        },
        click: function(e) {
            this.infoWindow.open(this.map, this);
            //alert('hongege'); // When click marker
        },
        icon: icon,
        animation: ani,
        //clickable: false,
    });
}

// Main function
// window.onload = function(){ DoFunctions() };
window.addEventListener('load', function() {

    // Get you are here
    GetCurrentLocation();

    // wait for creating map until finishing GMaps.geolocate()
    var timerID = setInterval( function() {
        if (wait_geolocat == 0) {

            // google.maps.Animation.BOUNCE = 1
            // google.maps.Animation.DROP   = 2
            var marker_normal = 0;
            var marker_bounce = 1;
            var marker_drop   = 2;

            // Init map
            var map = InitMap();

            // Put start sarker
            var s_title = 'Start point';
            var s_icon = '../image/enter.png';
            var s_content = '<h4>Start point</h4><ul><li>現在地がスタート地点になります。</li><li>このようにHTMLで埋め込むことが可能。</li></ul>';
            addMarkerFunc( map, s_lat, s_lng, s_title, s_content, marker_bounce, s_icon );

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
            // end $('#start_travel0').click(function(e){

            clearInterval(timerID);
            timerID = null;
        }
    }, 100);  // polling time  = 100ms = 0.1sec
    // end timerID

    //map.fitZoom();
});
