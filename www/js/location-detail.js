var ws = "http://192.168.120.174:8080/";
var JWT = window.localStorage.getItem("JWT");
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

}

$(document).ready(function () {
    var instance = M.Carousel.init({
        fullWidth: true
        , indicators: true
    });
    // Or with jQuery
    var url = window.location.href;     // Returns full URL
    var indexOfId = url.indexOf("=");
    var id = url.slice(indexOfId + 1, url.length);
    getListImgLink(id);
    getSpotDetail(id);
    loadSpotComments(id);

    $.ajax({
        url: ws + "prof/abc",
        type: 'GET',
        headers: {
            'Authorization': JWT
        },
        success: function (res) {
            $('#avatar-logged-user').attr('src', ws + 'images/' + res.imgURL);
        },
        error: function () {

        }

    });

    $('.fa-compass').click(function () {
       window.location = 'navigation.html';
    });

    $('#heart-icon').click(function () {
        $.ajax({
            url: ws + "spot/favorite?spotId=" + id,
            type: 'GET',
            headers: {
                'Authorization': JWT
            },
            success: function (res) {
                $('#heart-icon').attr("class", res);
                getSpotDetail(id);
            },
            error: function () {
                console.log("Could not favorite spot");
            }

        });
    });

    $('#back').click(function () {
        window.location = 'index.html'
    });

    $('.send-button').click(function () {
        commnetOnSpot(id);
    });
});

// var userDTO ;
// function  getUserDTO() {
//     $.ajax({
//         url: ws + "spot/" + id,
//         headers: {
//             'Authorization': JWT
//         },
//         type: 'GET',
//         success: function (res) {
//             // alert("true");
//             $('.location-name').text(res.spotName);
//             $('#location-address').text(res.address);
//             $('.fav-num').text(res.favouriteCount);
//             $('.mess-num').text(res.commentCount);


//         },
//         error: function () {
//             alert("Could not load data ");
//         }
//     });
// }

function getSpotDetail(id) {
    $.ajax({
        url: ws + "spot/" + id,
        headers: {
            'Authorization': JWT
        },
        type: 'GET',
        success: function (res) {
            window.localStorage.setItem('id', id);
            window.localStorage.setItem('lat', res.x_location);
            window.localStorage.setItem('lng', res.y_location);
            if (res.favorite) {
                $('#heart-icon').attr('class', 'fas fa-heart');
            } else {
                $('#heart-icon').attr('class', 'far fa-heart');
            }
            $('.location-name').text(res.spotName);
            $('#location-address').text(res.address);
            $('.fav-num').text(res.favouriteCount);
            $('.mess-num').text(res.commentCount);
        },
        error: function () {

        }
    });
}

function getListImgLink(id) {
    // alert(id);
    $.ajax({
        url: ws + "getListImages?spotId=" + id,
        headers: {
            'Authorization': JWT
        },
        type: 'GET',
        success: function (res) {
            var size = res.length;
            console.log("size: " + size);
            var i;
            // var sliderCenter ="";
            var s = '';
            for (i = 0; i < size; i++) {
                s +=
                    '\
                <div class="carousel-item">\
                    <img src="' + res[i].imageUrl + '">\
                </div>\
            '
            }

            $('.carousel.carousel-slider').append(s);


            $('.carousel.carousel-slider').carousel({
                fullWidth: true
                , indicators: false
            });
        },
        error: function (res) {
            console.log("FAILED: ");
        }
    });
}

function loadSpotComments(id) {
    $.ajax({
        url: ws + "loadCommentsInSpot?spotId=" + id,
        headers: {
            'Authorization': JWT
        },
        type: 'GET',
        success: function (res) {
            var i;
            console.log(res);

            //    var $ul =  '</ul>';
            for (i = 0; i < res.length; i++) {
                console.log("image: " + res[i].userDTO.fullName);
                var $li = '<ul class="collection commented">' +
                    '<li class="collection-item avatar">' +
                    '<img src="' + res[i].userDTO.imageUrl + '" alt="image" id="picture-user" class="circle">' +
                    '<span class="title">' +
                    '<b>' + res[i].userDTO.fullName + '</b>' +
                    '</span>' +
                    '<p>' + res[i].content + '</p>' +
                    '</ul>';
                $('.card-action').append($li);
            }

        },
        error: function () {
            console.log("FAILED: ");
        }
    });
}

function commnetOnSpot(id) {

    var commentDTO = {
        id: null,
        content: $('#comment').val(),
        createdTime: null,
        userDTO: null,
        spotId: id,

    };
    $.ajax({
        url: ws + "saveComment",
        headers: {
            'Authorization': JWT
        },
        data: JSON.stringify(commentDTO),
        type: 'POST',
        contentType: 'application/json',
        success: function (res) {
            $('#comment').val("");
            getSpotDetail(id);
            $('.commented').remove();
            loadSpotComments(id);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("err: " + errorThrown);
        }
    });

}
