var $cvs = document.getElementById('screenshot');
var $color = document.getElementById('color');
var ctx = $cvs.getContext('2d');
function setScreenshotUrl(url) {
    var img = new Image();
    img.onload = function(){
        ctx.drawImage(img, 0, 0, $cvs.width, $cvs.height);
    };
    img.src = url;
};
(function(){
    $cvs.width = document.body.clientWidth;
    $cvs.height = document.body.clientHeight;
    $cvs.addEventListener('mousemove', function(e){
        $color.style.transform = 'translate('+(e.pageX + $cvs.width)+'px,'+(e.pageY + $cvs.height)+'px)';
        $color.innerHTML = '#FFBA00';
    });
})();