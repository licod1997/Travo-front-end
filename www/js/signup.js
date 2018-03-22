$(document).ready(function () {
    var firstName = $('#first_name'),
        lastName = $('#last_name'),
        username = $('#username'),
        password = $('#password'),
        email = $('#email');

    $.ajax({
        url: 'http://localhost:8080/signup',
        method: 'POST',
        data: {firstName: firstName.val(), lastName: lastName.val(), username: username.val(), password: password.val(), email: email.val()},

    });
});