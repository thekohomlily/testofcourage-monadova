// Start point
var s_lat = 37.5180;
var s_lng = 139.9362;
// Goal point
var g_lat = 0;
var g_lng = 0;
// Waypoints
var wps = [];

// google.maps.Animation.BOUNCE = 1
// google.maps.Animation.DROP   = 2
var marker_normal = 0;
var marker_bounce = 1;
var marker_drop   = 2;

var wait_geolocat = 1;  // 1: wait, 0: you can go to next

//================================================================================

// Get you are here function
function GetCurrentLocation() {
    // navigator.geolocation.getCurrentPosition(
    //     function( position )
    //     {
    //         var data = position.coords ;
    //         s_lat = data.latitude ;
    //         s_lng = data.longitude ;
    //         console.log(lat);
    //         console.log(lng);
    //         wait_geolocat = 0;
    //     },
    //     function( error )
    //     {
    //         console.log( error.code );
    //     }
    // );
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
                this.setCenter(e.latLng.lat(), e.latLng.lng());

                // Put waypoint-i marker
                var i_title = 'Waypoint';
                var i_content = '<h4>Waypoint</h4><ul><li>Item</li></ul>';
                var i_icon = '../image/item_1.png';
                addMarkerFunc( map, e.latLng.lat(), e.latLng.lng(), i_title, i_content, marker_drop, i_icon );

                wps.push( [e.latLng.lat(), e.latLng.lng()] );
                // 配列に以下を代入する必要あり todo
                console.log( wps );
            }
        }, {
            title: 'Add goal',
            name: 'add_goal',
            action: function(e) {
                this.setCenter(e.latLng.lat(), e.latLng.lng());

                // Put goal marker
                g_lat =  e.latLng.lat();
                g_lng =  e.latLng.lng();
                var i_title = 'Goal point';
                var i_content = '<h4>Goal point</h4><ul><li>ここがゴール地点になります。</li><li>このようにHTMLで埋め込むことが可能。</li></ul>';
                var i_icon = '../image/exit.png';
                addMarkerFunc( map, e.latLng.lat(), e.latLng.lng(), i_title, i_content, marker_bounce, i_icon );
            }
        }, {
            title: 'Add start',
            name: 'add_start',
            action: function(e) {
                this.setCenter(e.latLng.lat(), e.latLng.lng());

                // Put start sarker
                s_lat =  e.latLng.lat();
                s_lng =  e.latLng.lng();
                var i_title = 'Start point';
                var i_content = '<h4>Start point</h4><ul><li>現在地がスタート地点になります。</li><li>このようにHTMLで埋め込むことが可能。</li></ul>';
                var i_icon = '../image/enter.png';
                addMarkerFunc( map, e.latLng.lat(), e.latLng.lng(), i_title, i_content, marker_bounce, i_icon );
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
        dblclick: function(e) {
            // アイテムをダブルクリックでページのリロード
            location.reload();
        },
        icon: icon,
        animation: ani,
        //clickable: false,
        //cursor: "url(./../image/ghost_3.jpg), auto",
    });
}

//================================================================================

// Main function
// window.onload = function(){ DoFunctions() };
window.addEventListener('load', function() {

    // Get you are here
    GetCurrentLocation();

    // wait for creating map until finishing GMaps.geolocate()
    var timerID = setInterval( function() {
        if (wait_geolocat == 0) {

            // Init map
            var map = InitMap();

            // // Put start sarker
            // var s_title = 'Start point';
            // var s_content = '<h4>Start point</h4><ul><li>現在地がスタート地点になります。</li><li>このようにHTMLで埋め込むことが可能。</li></ul>';
            // var s_icon = '../image/enter.png';
            // addMarkerFunc( map, s_lat, s_lng, s_title, s_content, marker_bounce, s_icon );

            // // Put goal marker
            // var g_title = 'Goal point';
            // var g_content = '<h4>Goal point</h4><ul><li>ここがゴール地点になります。</li><li>このようにHTMLで埋め込むことが可能。</li></ul>';
            // var g_icon = '../image/exit.png';
            // addMarkerFunc( map, g_lat, g_lng, g_title, g_content, marker_bounce, g_icon );

            // // Put waypoint-1 marker
            // var i_title = 'Waypoint 1';
            // var i_content = '<h4>Waypoint 1</h4><ul><li>アイテムの配置やルートの指定を経由地点の指定に見立てればうまく実装できそう。</li></ul><a href="../image/ghost_4.jpg" target="_blank">Preview</a>';
            // var i_icon = '../image/item_1.png';
            // addMarkerFunc( map, wp1_lat, wp1_lng, i_title, i_content, marker_bounce, i_icon );

            // // Put waypoint-2 marker
            // var i_title = 'Waypoint 2';
            // var i_content = '<h4>Waypoint 2</h4><ul><li>アイテムの配置やルートの指定を経由地点の指定に見立てればうまく実装できそう。</li></ul>';
            // var i_icon = '../image/item_2.png';
            // addMarkerFunc( map, wp2_lat, wp2_lng, i_title, i_content, marker_bounce, i_icon );

            // // put waypoint-3 marker
            // var i_title = 'Waypoint 3';
            // var i_content = '<h4>Waypoint 3</h4><ul><li>アイテムの配置やルートの指定を経由地点の指定に見立てればうまく実装できそう。</li></ul>';
            // var i_icon = '../image/item_3.png';
            // addMarkerFunc( map, wp3_lat, wp3_lng, i_title, i_content, marker_bounce, i_icon );



            // Print route
            $('#get_route').click(function(e){
                var waypts_obj = [];
                for(var i = 0; i < wps.length; i++) {
                    console.log(i);
                    waypts_obj.push({
                        location: new google.maps.LatLng( wps[i][0], wps[i][1] ),
                    });
                }

                console.log(waypts_obj);

                map.drawRoute({
                    origin: [s_lat, s_lng],       // 出発地点の座標: Start point
                    destination: [g_lat, g_lng],  // 到着地点の座標: Goal point
                    // waypoint
                    waypoints: waypts_obj,
                    travelMode: 'walking',        // 移動手段: 徒歩
                    strokeColor: '#71ff71',       // ルートラインの色:     green
                    strokeOpacity: 0.5,           // ルートラインの透明度: [0.0, 1.0]
                    strokeWeight: 3,              // ルートラインの太さ:   integer
                });
            });


            $('#start_travel').click(function(e) {

                var cnt = 0;
                var intervalTime = 15000;  // 15 sec

                e.preventDefault();
                $('#instructions').empty();
                map.travelRoute({
                    origin: [s_lat, s_lng],       // 出発地点の座標: Start point
                    destination: [wps[0][0], wps[0][1]],  // 到着地点の座標: Goal point
                    //                    destination: [wp1_lat, wp1_lng],  // 到着地点の座標: Goal point
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
                        origin: [wps[wps.length - 1][0], wps[wps.length - 1][1]],       // 出発地点の座標: Start point
                        //                        origin: [wp3_lat, wp3_lng],       // 出発地点の座標: Start point
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
                }, intervalTime * wps.length);
            });
            // end $('#start_travel').click(function(e){

            clearInterval(timerID);
            timerID = null;
        }
    }, 100);  // polling time  = 100ms = 0.1sec
    // end timerID

    //map.fitZoom();
});
