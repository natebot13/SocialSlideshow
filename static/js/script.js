var requestInterval = 10000
var loadWaitInterval = 3000

var url = "slides.nathanp.me";
var images = [];
var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var images = JSON.parse(xmlhttp.responseText);
        chooseNextImage();
    }
};

function getImageList() {
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function chooseNextImage () {
    $('.nextImage').src = images[Math.floor(Math.random() * images.length)];
    setTimeout(function() {
        var element = $('.nextImage');
        $(element).removeClass('.nextImage');
        $(element).addClass('.currentImage');
        $(element).addClass('animated');
        $(element).addClass('slideIn');
        
        element = $('.currentImage');
        $(element).removeClass('.currentImage');
        $(element).addClass('.nextImage');
    }, loadWaitInterval);
}

$('.currentImage').bind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
    $('.currentImage').removeClass('animated');
    $('.currentImage').removeClass('slideIn');
});

var requester = setInterval(getImageList, requestInterval);