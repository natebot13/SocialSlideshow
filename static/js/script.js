var requestInterval = 10000
var loadWaitInterval = 3000
var url = "images.txt";

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
    $('.nextImage').src = images[Math.floor(Math.random() * images.length)];
    setTimeout(function() {
        var next = $('.nextImage');
        var current = $('.currentImage');
        $(next).removeClass('nextImage');
        $(next).addClass('currentImage');
        $(next).addClass('animated');
        $(next).addClass('slideInUp');
        
        $(current).removeClass('currentImage');
        $(current).addClass('nextImage');
    }, loadWaitInterval);
}

$('.currentImage').bind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
    $('.currentImage').removeClass('animated');
    $('.currentImage').removeClass('slideInUp');
});

var requester = setInterval(getImageList, requestInterval);