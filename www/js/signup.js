$(document).ready(function () {
    var firstName = $('#first_name'),
        lastName = $('#last_name'),
        username = $('#username'),
        password = $('#password'),
        email = $('#email');

    $('#signup-button').click(function (e) {
        e.preventDefault();

        $.ajax({
            url: 'http://192.168.120.174:8080/signup',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                firstName: firstName.val(),
                lastName: lastName.val(),
                username: username.val(),
                password: password.val(),
                email: email.val()
            }),
            success: function (result) {
                window.location = 'login.html';
            },
            error: function (xhr, textStatus, errorThrown) {
            }
        });
    });
});