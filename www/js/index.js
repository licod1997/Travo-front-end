$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:8080/auth',
        type: 'GET',
        success: function (result) {
            console.log("123");
        },
        error: function (xhr, textStatus, errorThrown) {
            window.location = 'login.html'
        }
    });

    var closeButton = $('#close-button');

    closeButton.hide();

    $('#search').hide();

    $(".button-collapse").sideNav();

});