$(document).click(function () {
    $('#back').click(function () {
        history.go(-1);
        navigator.app.backHistory();
    });
});