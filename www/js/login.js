$(document).ready(function () {

    var signinButton = $('#signin-button');
    var errorMessage = $('#login-failed');

    signinButton.click(function (e) {
        e.preventDefault();

        var usernameVal = $('#username').val();
        var passwordVal = $('#password').val();
        
        var obj = {
            username: usernameVal,
            password: passwordVal
        }

        $.ajax({
            url: 'http://10.82.137.94:8080/login',
            type: 'POST',
            contentType: 'json',
            data: JSON.stringify(obj),
            crossDomain: true,
            success: function (result) {
                errorMessage.text('');
                window.localStorage.setItem("JWT", result);
                window.location = 'index.html';
            },
            error: function (xhr, textStatus, errorThrown) {
                errorMessage.text('Username or password was incorrect');
            }
        });



    });

});