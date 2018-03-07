$(document).ready(function () {
    var searchBox = $('.search-box'),
        searchField = $('.search-field'),
        hamburger = $('.hamburger'),
        pageTitle = $('.page-title');

    searchBox.focusout(function () {
        hamburger.show();
        pageTitle.show();
        searchField.removeClass('col-xs-12');
        searchField.addClass('col-xs-2');
    });

    searchBox.focusin(function () {
        hamburger.hide();
        pageTitle.hide();
        searchField.removeClass('col-xs-2');
        searchField.addClass('col-xs-12');
    })
});