document.addEventListener('DOMContentLoaded', function() {
    var clickButton = document.getElementById('click');
    clickButton.addEventListener('click', function() {

        chrome.tabs.getCurrent(function(tab) {
            window.open('https://www.google.com/');
        });


    }, false);
}, false);