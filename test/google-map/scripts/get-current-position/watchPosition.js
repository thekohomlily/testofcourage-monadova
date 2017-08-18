// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//
//  【 現在地の取得サンプル 】  http://www.cman.jp
//
//     cmanPosWatch() を実行すると、現在位置の追跡を行います。
//
//     【デモ用】の箇所は、でも（サンプル）の表示用です。
//      このため、使用に合わせた変更が必要です。
//
//   商用,改変,再配布はすべて自由ですですが、動作保証はありません
//
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

var cmanWatchID;            // watchPositionのオブジェクト
var cmanWatchLoopCnt = 0;   //【デモ用】デモを強制的に停止するためのカウンター
var cmanWatchLoopMax = 30;  //【デモ用】強制的にデモを止める回数
var cmanMapTime;            //【デモ用】地図を更新した時間
var cmanMapUpTime = 5;      //【デモ用】地図は5秒以上の間隔で更新

//==================================================================================================
//  位置取得 成功時に実行される
//==================================================================================================
function cmanWatOk(argPos){

    // --- 取得した値を出力 ------------------------------------------------------------------------
    document.getElementById("watLatitude").innerHTML         = argPos.coords.latitude;          // 緯度
    document.getElementById("watLongitude").innerHTML        = argPos.coords.longitude;         // 経度
    document.getElementById("watAccuracy").innerHTML         = argPos.coords.accuracy;          // 緯度・経度の誤差
    document.getElementById("watAltitude").innerHTML         = argPos.coords.altitude;          // 高度
    document.getElementById("watAltitudeAccuracy").innerHTML = argPos.coords.altitudeAccuracy;  // 高度の誤差
    document.getElementById("watHeading").innerHTML          = argPos.coords.heading;           // 方角(0:北)
    document.getElementById("watSpeed").innerHTML            = argPos.coords.speed;             // 速度
    document.getElementById("watDate").innerHTML             = (new Date()).toString();         // 取得時間

    // ---【デモ用】結果表示制御 -------------------------------------------------------------------
    cmanWatDisplayCtrl('OK');

    // ---【デモ用】GoogleMapで位置を表示 ----------------------------------------------------------
    cmanMapUpdate(argPos.coords.latitude, argPos.coords.longitude, '');

    // ---【デモ用】一定回数追跡で自動停止する -----------------------------------------------------
    cmanWatchLoopCnt++;
    if(cmanWatchLoopCnt> cmanWatchLoopMax){
        navigator.geolocation.clearWatch(cmanWatchID);
        document.getElementById("watDate").innerHTML += '<br><span style="color:blue">位置の追跡を停止しました。</span>';
    }
}


//==================================================================================================
//  位置取得 失敗時に実行される
//==================================================================================================
function cmanWatErr(argErr){
    var wErrMsg = "";
    switch(argErr.code){
        case 1 : wErrMsg = "位置情報の利用が許可されていません";break;
        case 2 : wErrMsg = "デバイスの位置が判定できません";break;
        case 3 : wErrMsg = "タイムアウトしました";break;
    }
    if(wErrMsg == ""){wErrMsg = argErr.message;}

    // --- エラーメッセージ出力 --------------------------------------------------------------------
    document.getElementById("watErrMag").innerHTML = wErrMsg;

    // ---【デモ用】結果表示制御 -------------------------------------------------------------------
    cmanWatDisplayCtrl('ERR');
}


//==================================================================================================
//  位置取得 実行
//==================================================================================================
function cmanPosWatch(){

    cmanWatchLoopCnt=0;

    // --- 何度もボタンを押した対応 ----------------------------------------------------------------
    if(typeof cmanWatchID === 'number'){
        navigator.geolocation.clearWatch(cmanWatchID);
    }

    // --- ブラウザが対応しているかチェック --------------------------------------------------------
    if (typeof navigator.geolocation === 'undefined') {
        document.getElementById("watErrMag").innerHTML = 'ブラウザが位置情報取得に対応していません';
        cmanWatDisplayCtrl('ERR');
        return false;
    }

    // --- オプション設定 --------------------------------------------------------------------------
    var wOptions = {
        "enableHighAccuracy": true,         // true : 高精度
        "timeout": 10000,                   // タイムアウト : ミリ秒
        "maximumAge": 0,                    // データをキャッシュ時間 : ミリ秒
    };

    // --- 位置取得 --------------------------------------------------------------------------------
    cmanWatchID = navigator.geolocation.watchPosition(cmanWatOk,    // 位置取得成功時に実行される関数
                                                      cmanWatErr,   // 位置取得失敗時に実行される関数
                                                      wOptions );   // オプション

    // ---【デモ用】結果表示制御 -------------------------------------------------------------------
    cmanWatDisplayCtrl('START');
    return true;
}


//==================================================================================================
//  【デモ用】結果表示制御 (デモ画面の表示制御用のため、サンプル動作には関係ありません)
//==================================================================================================
function cmanWatDisplayCtrl(argMsg){

    // --- 結果表示制御 ----------------------------------------------------------------------------
    document.getElementById("watOut-area").style.display     = '';
    switch(argMsg){
        case 'OK' :
            document.getElementById("watShorichu").style.display     = 'none';
            document.getElementById("watOut-err-area").style.display = 'none';
            document.getElementById("watOut-ok-area").style.display  = '';
            break;
        case 'ERR' :
            document.getElementById("watShorichu").style.display     = 'none';
            document.getElementById("watOut-err-area").style.display = '';
            document.getElementById("watOut-ok-area").style.display  = 'none';
            break;
        default :
            document.getElementById("watShorichu").style.display     = '';
            document.getElementById("watOut-err-area").style.display = 'none';
            document.getElementById("watOut-ok-area").style.display  = 'none'
            break;
    }

    // --- 結果エリアにゆっくりスクロール ----------------------------------------------------------
    //     https://web-designer.cman.jp/javascript_ref/window/link_scroll/  を参照
    if(cmanWatchLoopCnt == 0){
        cmanLinkScroll('watOut-area');
    }
}


//==================================================================================================
//  【デモ用】地図(Google Map)の更新(デモ画面の表示制御用のため、サンプル動作には関係ありません)
//==================================================================================================
function cmanMapUpdate(argLatitude , argLongitude , argFlg){

    // 読み込みが必要
    // <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>

    // --- 地図の更新頻度チェック ------------------------------------------------------------------
    if((typeof cmanMapTime) === 'object'){

        var wNowTime = new Date();
        if((argFlg != '1')&&(((wNowTime - cmanMapTime) / 1000) < cmanMapUpTime)){
            return false;
        }
    }
    cmanMapTime = new Date();

    // --- 緯度・経度の編集 ------------------------------------------------------------------------
    var wCenterPos = new google.maps.LatLng(argLatitude , argLongitude);

    // --- オプション編集 --------------------------------------------------------------------------
    var wOptions = {
            zoom: 16,                                 // ズーム率
            center: wCenterPos,                       // 地図中央の座標
            mapTypeId: google.maps.MapTypeId.ROADMAP  // 通常の地図
    };

    // --- GoogleMapを表示 -------------------------------------------------------------------------
    var wGoogleMap = new google.maps.Map(document.getElementById("watMap"), wOptions);

    // --- 座標にマーカーを付ける ------------------------------------------------------------------
    var wMarker = new google.maps.Marker({
            position: wCenterPos,
            map: wGoogleMap
            });
}
