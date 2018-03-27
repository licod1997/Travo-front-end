$(document).ready(function () {
    var JWT = window.localStorage.getItem("JWT");

    $.ajax({
        url: 'http://192.168.120.174:8080/auth',
        type: 'GET',
        headers: {
            'Authorization': JWT
        },
        success: function (result) {
            loadPopular();

            $.ajax({
                url: 'http://192.168.120.174:8080/prof/abc',
                type: 'GET',
                headers: {
                    'Authorization': JWT
                },
                success: function (res) {
                    $('#avatar').attr('src', 'http://192.168.120.174:8080/images/' + res.imgURL);
                },
                error: function () {

                }

            });
        },
        error: function (xhr, textStatus, errorThrown) {
            window.location = 'login.html';
        }
    });

    function loadPopular() {
        $.ajax({
            url: 'http://192.168.120.174:8080/popular-spot',
            type: 'POST',
            headers: {
                'Authorization': JWT
            },
            contentType: 'application/json',
            data: JSON.stringify({page: 1, size: 100}),
            success: function (data) {
                console.log(data);
                var i = 0;
                var s = '';
                for (i = 0; i < data.length; i++) {
                    if (data[i].favorite) {
                        s +=
                            '   <div class="col s6">\n' +
                            '        <div class="card">\n' +
                            '            <a href="location-detail.html?=' + data[i].id + '">\n' +
                            '                <div class="card-image">\n' +
                            '                    <img src="http://192.168.120.174:8080/images/' + data[i].imageUrl + '">\n' +
                            '                </div>\n' +
                            '                <div class="card-content">\n' +
                            '                    <b class="destination-title">' + data[i].spotName + '</b>\n' +
                            '                    <p>' + data[i].adress + '</p>\n' +
                            '                </div>\n' +
                            '                <div class="user-interaction">\n' +
                            '                    <i class="fas fa-heart"></i>\n' +
                            '                    <span class="fav-count">' + data[i].favoriteCount + '</span>\n' +
                            '                    <i class="far fa-comment-alt"></i>\n' +
                            '                    <span class="com-count">' + data[i].commentCount + '</span>\n' +
                            '                </div>\n' +
                            '            </a>\n' +
                            '        </div>\n' +
                            '    </div>';
                    } else {
                        s +=
                            '   <div class="col s6">\n' +
                            '        <div class="card">\n' +
                            '            <a href="location-detail.html?=' + data[i].id + '">\n' +
                            '                <div class="card-image">\n' +
                            '                    <img src="http://192.168.120.174:8080/images/' + data[i].imageUrl + '">\n' +
                            '                </div>\n' +
                            '                <div class="card-content">\n' +
                            '                    <b class="destination-title">' + data[i].spotName + '</b>\n' +
                            '                    <p>' + data[i].adress + '</p>\n' +
                            '                </div>\n' +
                            '                <div class="user-interaction">\n' +
                            '                    <i class="far fa-heart"></i>\n' +
                            '                    <span class="fav-count">' + data[i].favoriteCount + '</span>\n' +
                            '                    <i class="far fa-comment-alt"></i>\n' +
                            '                    <span class="com-count">' + data[i].commentCount + '</span>\n' +
                            '                </div>\n' +
                            '            </a>\n' +
                            '        </div>\n' +
                            '    </div>';
                    }
                }
                $('#test1 .row').empty();
                $('#test1 .row').append(s);
            },
            error: function (xhr, textStatus, errorThrown) {

            }
        });
    }

    var inputField = $('.input-field');
    var notInputField = $('.input-field').siblings();
    var input = $('#search');
    var closeButton = $('.close-button');

    $('.tabs').tabs();
    $('.sidenav').sidenav();

    $('.searchnav-trigger').click(function () {
        notInputField.hide();
        inputField.show();
        input.focus();
    });

    closeButton.click(function () {
        inputField.hide();
        notInputField.show();
        input.val('');
    });

    input.blur(function () {
        inputField.hide();
        notInputField.show();
        input.val('');
    });

    $('#log-out').click(function () {
        JWT = window.localStorage.setItem('JWT', '');
        window.location = 'login.html';
    });

    $('.card').click(function () {
        window.location = 'location-detail.html';
    });

    $('.user-view').click(function () {
        window.location = 'profile.html';
    });

    // input.autocomplete({
    //     data: {}
    // });


    function AutoCompleteDTO(name, id) {
        this.name = name;
        this.id = id;
    }

    var autocompleteObj = {};
    var autocimpleteList = [];

    input.autocomplete({
        onAutocomplete: function (data) {
            $.ajax({
                url: 'http://192.168.120.174:8080/search-result?value=' + data,
                type: 'GET',
                headers: {
                    'Authorization': JWT
                },
                success: function (result) {
                    window.location = 'location-detail.html?spotId=' + result;
                },
                error: function (xhr, textStatus, errorThrown) {

                }
            });
        }
    });

    input.keyup(function () {
        $.ajax({
            url: 'http://192.168.120.174:8080/auto-complete?value=' + $(this).val(),
            type: 'GET',
            headers: {
                'Authorization': JWT
            },
            success: function (result) {
                var i = 0;
                for (i = 0; i < result.length; i++) {
                    autocompleteObj[result[i].name] = null;
                    autocimpleteList.push(AutoCompleteDTO(result[i].name, result[i].id));
                }
                input.autocomplete('updateData', autocompleteObj);
            },
            error: function (xhr, textStatus, errorThrown) {

            }
        });
    });

    $('#tab1').click(function () {
        loadPopular();
    });

    $('#tab2').click(function () {

        var watchID = navigator.geolocation.watchPosition(onSuccess, onError, {
            timeout: 30000,
            enableHighAccuracy: true,
            maximumAge: 3000
        });

        function onSuccess(position) {
            var lat = position.coords.latitude,
                lng = position.coords.longitude;

            $.ajax({
                url: 'http://192.168.120.174:8080/near-me',
                type: 'POST',
                headers: {
                    'Authorization': JWT
                },
                contentType: 'application/json',
                data: JSON.stringify({lat: lat, lng: lng, zoom: '', page: 1, size: 100}),
                success: function (data) {
                    console.log(data);
                    var i = 0;
                    var s = '';
                    for (i = 0; i < data.length; i++) {
                        if (data[i].favorite) {
                            s +=
                                '   <div class="col s6">\n' +
                                '        <div class="card">\n' +
                                '            <a href="location-detail.html?=' + data[i].id + '">\n' +
                                '                <div class="card-image">\n' +
                                '                    <img src="http://192.168.120.174:8080/images/' + data[i].imageUrl + '">\n' +
                                '                </div>\n' +
                                '                <div class="card-content">\n' +
                                '                    <b class="destination-title">' + data[i].spotName + '</b>\n' +
                                '                    <p>' + data[i].adress + '</p>\n' +
                                '                </div>\n' +
                                '                <div class="user-interaction">\n' +
                                '                    <i class="fas fa-heart"></i>\n' +
                                '                    <span class="fav-count">' + data[i].favoriteCount + '</span>\n' +
                                '                    <i class="far fa-comment-alt"></i>\n' +
                                '                    <span class="com-count">' + data[i].commentCount + '</span>\n' +
                                '                </div>\n' +
                                '            </a>\n' +
                                '        </div>\n' +
                                '    </div>';
                        } else {
                            s +=
                                '   <div class="col s6">\n' +
                                '        <div class="card">\n' +
                                '            <a href="location-detail.html?=' + data[i].id + '">\n' +
                                '                <div class="card-image">\n' +
                                '                    <img src="http://192.168.120.174:8080/images/' + data[i].imageUrl + '">\n' +
                                '                </div>\n' +
                                '                <div class="card-content">\n' +
                                '                    <b class="destination-title">' + data[i].spotName + '</b>\n' +
                                '                    <p>' + data[i].adress + '</p>\n' +
                                '                </div>\n' +
                                '                <div class="user-interaction">\n' +
                                '                    <i class="far fa-heart"></i>\n' +
                                '                    <span class="fav-count">' + data[i].favoriteCount + '</span>\n' +
                                '                    <i class="far fa-comment-alt"></i>\n' +
                                '                    <span class="com-count">' + data[i].commentCount + '</span>\n' +
                                '                </div>\n' +
                                '            </a>\n' +
                                '        </div>\n' +
                                '    </div>';
                        }
                    }
                    $('#test2 .row').empty();
                    $('#test2 .row').append(s);

                    navigator.geolocation.clearWatch(watchID);
                },
                error: function (xhr, textStatus, errorThrown) {

                }
            });
        }

        function onError(error) {
            alert('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        }
    });
});