function gotoMap1() {
    window.open('html/map1.html', 'mywindow2', 'width=400, height=400, menubar=no, toolbar=no, scrollbars=yes');
}

function closeMap1() {
    if(window.opener){
        // ウィンドウを閉じる
        window.close();
    }
}

//window.open('html/after_map1.html', 'mywindow2', 'width=400, height=400, menubar=no, toolbar=no, scrollbars=yes');
