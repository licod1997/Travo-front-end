$(document).ready(function () {

    var signinButton = $('#signin-button');
    var errorMessage = $('#login-failed');

    signinButton.click(function (e) {
        e.preventDefault();

        var username = $('#username').val();
        var password = $('#password').val();

        $.ajax({
            url: 'http://localhost:8080/login',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            username: username,
            data: {username: username, password: password},
            success: function (result) {
                // errorMessage.text('');
                window.location = 'index.html';
            },
            error: function (xhr, textStatus, errorThrown) {
                errorMessage.text('Username or password was incorrect');
                // var err = JSON.parse(xhr.responseText);
                // if (err.path === '/login') {
                //     console.log('login page');
                // }
            }
        });
    });

});