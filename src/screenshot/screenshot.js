var $cvs = document.getElementById('screenshot');
var $color = document.getElementById('color');
var ctx = $cvs.getContext('2d');
function setScreenshotUrl(url) {
    var img = new Image();
    img.onload = function () {
        ctx.drawImage(img, 0, 0, $cvs.width, $cvs.height);
    };
    img.src = url;
};
function dec2Hex(dec) {
    let hex = dec.toString(16);
    while (hex.length < 2) {
        hex = '0' + hex;
    }
    return hex.toUpperCase();
};
function getImgPixelRGBColor(x, y) {
    // get pixel data
    var imgData = ctx.getImageData(0, 0, $cvs.width, $cvs.height);
    var rgb = '#';
    for (let i = 0, offset = (x + $cvs.width * y) * 4; i < 3; i++) {
        rgb += dec2Hex(imgData.data[offset++]);
    }
    return rgb;
}
function getImgPixelRGBAColor(x, y) {
    // get pixel data
    var imgData = ctx.getImageData(0, 0, $cvs.width, $cvs.height);
    var rgba = [];
    for (let i = 0, offset = (x + $cvs.width * y) * 4; i < 4; i++) {
        rgba.push(i==3 ? imgData.data[offset++]/255 : imgData.data[offset++]);
    }
    return 'rgba(' + rgba.join(',') + ')';
}
(function () {
    $cvs.width = document.body.clientWidth;
    $cvs.height = document.body.clientHeight;
    $cvs.addEventListener('mousemove', function (e) {
        let revisionX = 15, revisionY = 15;
        if (e.pageX > $cvs.width / 2) {
            revisionX = -95;
        }
        if (e.pageY > $cvs.height / 2) {
            revisionY = -45;
        }
        // color span position
        $color.style.transform = 'translate(' + (e.pageX + $cvs.width + revisionX) + 'px,'
            + (e.pageY + $cvs.height + revisionY) + 'px)';

        let rgb = getImgPixelRGBColor(e.pageX, e.pageY);
        $color.innerHTML = '<span style="background:'+rgb+';display:inline-block;width:12px;height:12px;"></span> ' + rgb;
    });
    $cvs.addEventListener('click', function (e) {
        let rgb = getImgPixelRGBColor(e.pageX, e.pageY);

        // clipboard.js
        const fakeElem = document.createElement('textarea');
        // Prevent zooming on iOS
        fakeElem.style.fontSize = '12pt';
        // Reset box model
        fakeElem.style.border = '0';
        fakeElem.style.padding = '0';
        fakeElem.style.margin = '0';
        // Move element out of screen horizontally
        fakeElem.style.position = 'absolute';
        fakeElem.style.left = '-9999px';
        fakeElem.style.top = '-9999px';

        fakeElem.setAttribute('readonly', '');
        fakeElem.value = rgb;

        document.body.appendChild(fakeElem);

        fakeElem.select();
        fakeElem.setSelectionRange(0, fakeElem.value.length);;
        let succeeded;
        try {
            succeeded = document.execCommand('copy');
        } catch (err) {
            succeeded = false;
            console.error(err);
        }
        if (succeeded) {
            alert('复制成功');
        } else {
            alert('复制失败');
        }
        document.body.removeChild(fakeElem);
    });
})();