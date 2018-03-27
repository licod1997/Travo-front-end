$(document).ready(function () {
    function onSuccess(position) {
        alert('Latitude: '  + position.coords.latitude +
            '\nLongitude: ' + position.coords.longitude);
    }
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
    }
    navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });
});