$(document).ready(function () {
    var JWT = window.localStorage.getItem("JWT");
    
    $.ajax({
        url: 'http://10.82.137.94:8080/auth',
        type: 'GET',
        headers: {
            'Authorization': JWT
        },
        success: function (result) {

        },
        error: function (xhr, textStatus, errorThrown) {
            window.location = 'login.html';
        }
    });

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
    });

    input.blur(function () {
        inputField.hide();
        notInputField.show();
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
});