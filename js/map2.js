var window_obj = null;

function gotoMap() {
     window_obj = window.open('map2.html', '_blank', 'width=400, height=400, menubar=no, toolbar=no, scrollbars=yes');

}

function closeMap() {
    if(window.opener){
        // ウィンドウを閉じる
//        window.close();
            window.open('after_map2.html', '_self', 'width=400, height=400, menubar=no, toolbar=no, scrollbars=yes');
    }
}

// ------------------------------------------------------------
// 一定の時間隔で実行する
// ------------------------------------------------------------
// var interval = setInterval(function () {
//     if (window_obj) {
//         // ウィンドウが閉じられたか調べる
//         var closed = window_obj.closed;

//         // 出力テスト
//         if (closed) {
//             console.log("Window was closed." + closed);
//             clearInterval( interval );
//             window.open('html/after_map1.html', '_self', 'width=400, height=400, menubar=no, toolbar=no, scrollbars=yes');
//         }

//     }
// },1000);
