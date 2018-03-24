var ws = "http://localhost:8080/"

$(document).ready(function () {
    var instance = M.Carousel.init({
        fullWidth: true
        , indicators: true
    });
    // Or with jQuery
    $('.carousel.carousel-slider').carousel({
        fullWidth: true
        , indicators: false
    });
    var url      = window.location.href;     // Returns full URL
    var indexOfId = url.indexOf("=");
    var id = url.slice(indexOfId+1,url.length);
    getListImgLink(id);
    getSpotDetail(id);

});
function getSpotDetail(id) {
    $.ajax({
        url: ws+"spot/"+id,
        type: 'GET',
        success: function(res){
            alert("true");
            $('.location-name').text(res.spotName);
            $('#location-address').text(res.address);
            $('.fav-num').text(res.favouriteCount);
            $('.mess-num').text(res.commentCount);


        },
        error: function(){
            alert("Could not load data ");
        }
    });
}
function getListImgLink(id) {
    alert(id);
    $.ajax({
        url: ws+"getListImages?spotId="+id,
        type: 'GET',
        success: function(res){
            var size = res.length;
            console.log("size: "+size);
            var i;
            var cardImageDiv = $("<div>",{class: "carousel carousel-slider center"});
            for(i=0; i < size; i++) {
                console.log("ImageURL: "+res[i].imageUrl);
                var imageDiv = $("<div>",{class: "carousel-item"});
                alert(imageDiv);
                var img = $("<img>", {id: "image-slider"});
                $('#image-slider').attr("id","image-slider"+i);
            
                $('#image-slider'+i).attr("src", ""+res[i].imageUrl);
                imageDiv.append(img);
                $('.carousel carousel-slider center').append(imageDiv);
               
            }
            $('.card-image').append(cardImageDiv);
        },
        error: function(res){
            console.log("FAILED: "+res);
        }
    });
}
function loadSpotComments(id) {
    $.ajax({
        url: ws+"loadCommentsInSpot?spotId="+id,
        type: 'GET',
        success: function (res){

        },
        error: function(){
            console.log("FAILED: "+res);
        }
    });
}
