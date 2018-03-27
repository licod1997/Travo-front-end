$(document).ready(function () {
    var id = window.localStorage.getItem("id");
    var lat = window.localStorage.getItem("lat");
    var lng = window.localStorage.getItem("lng");
    var curX;
    var curY;

    $('#map').attr('src', 'https://www.google.com/maps/embed/v1/place?key=AIzaSyB3c61aY4Fh0lJPAtFwcxfwNmf8_nXd8b4&q=' + lat + ',' + lng);

    $('#back').click(function () {
        window.location = 'location-detail.html?=' + id;
    });

    var watchID;

    $('#switch').click(function () {
        if ($(this).hasClass('fa-location-arrow')) {
            $(this).removeClass('fa-location-arrow');
            $(this).addClass('fa-compass');

            watchID = navigator.geolocation.watchPosition(onSuccess, onError, {
                timeout: 30000,
                enableHighAccuracy: true,
                maximumAge: 3000
            });


        } else {
            $(this).removeClass('fa-compass');
            $(this).addClass('fa-location-arrow');

            $('#map').attr('src', 'https://www.google.com/maps/embed/v1/place?key=AIzaSyB3c61aY4Fh0lJPAtFwcxfwNmf8_nXd8b4&q=' + lat + ',' + lng);
        }
    });

    function onSuccess(position) {
        curX = position.coords.latitude;
        curY = position.coords.longitude;

        $('#map').attr('src', 'https://www.google.com/maps/embed/v1/directions?key=AIzaSyB3c61aY4Fh0lJPAtFwcxfwNmf8_nXd8b4&origin=' + curX + ',' + curY + '&destination=' + lat + ',' + lng + '&mode=driving');
        navigator.geolocation.clearWatch(watchID);
    }

    function onError(error) {
        alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
    }
});