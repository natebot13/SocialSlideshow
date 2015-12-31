var requestInterval = 10000;
var loadWaitInterval = 3000;
var removeAnimationInterval = 2000;
var url = "http://newyears.nathanp.me/slideshow/getimages";
var animations = ["bounceIn", "bounceInDown", "bounceInLeft", "bounceInRight", "bounceInUp",
                  "fadeIn", "fadeInDown", "fadeInDownBig", "fadeInLeft", "fadeInLeftBig", "fadeInRight", "fadeInRightBig", "fadeInUp", "fadeInUpBig",
                  "flipInX", "flipInY",
                  "lightSpeedIn",
                  "rotateIn", "rotateInDownLeft", "rotateInDownRight", "rotateInUpLeft", "rotateInUpRight",
                  "slideInUp", "slideInDown", "slideInLeft", "slideInRight",
                  "zoomIn", "zoomInDown", "zoomInLeft", "zoomInRight", "zoomInUp",
                  "rollIn"]

var images = [];
var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
    console.log(xmlhttp.responseText);
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        images = JSON.parse(xmlhttp.responseText);
        chooseNextImage();
    }
};

function getImageList() {
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function chooseNextImage () {
    var animation = animations[Math.floor(Math.random() * animations.length)];
    $('.nextImage').children().attr('src', images[Math.floor(Math.random() * images.length)]);
    setTimeout(function() {
        var next = $('.nextImage');
        var current = $('.currentImage');
        $(next).removeClass('nextImage');
        $(next).addClass('currentImage');
        next = next.children();
        $(next).addClass('animated');
        $(next).addClass(animation);
        setTimeout(function() {
            $(next).removeClass('animated');
            $(next).removeClass(animation);
        }, removeAnimationInterval);

        $(current).removeClass('currentImage');
        $(current).addClass('nextImage');
    }, loadWaitInterval);
}

var requester = setInterval(getImageList, requestInterval);

var hue = Math.floor(Math.random() * 360);
var colorbackground = setInterval(function() {
    var backgroundobj = {backgroundColor: 'hsl(' + hue + ', 100%, 50%)'};
    $('body').css(backgroundobj);
    hue += 1;
    if (hue >= 360) {
        hue = 0;
    }
}, 200);
