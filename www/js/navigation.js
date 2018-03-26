$(document).ready(function () {
    var lat = window.localStorage.getItem("lat");
    var lng = window.localStorage.getItem("lng");

    lat = '19.3790898';
    lng = '105.4846216';

    $('#map').attr('src', 'https://www.google.com/maps/embed/v1/place?key=AIzaSyB3c61aY4Fh0lJPAtFwcxfwNmf8_nXd8b4&q=' + lat + ',' + lng);

    $('#back').click(function () {
        history.go(-1);
        navigator.app.backHistory();
    });
});