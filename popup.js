/* global chrome */
document.addEventListener(
  'DOMContentLoaded',
  () => {
    const clickButton = document.getElementById('click');
    clickButton.addEventListener(
      'click',
      function () {
        chrome.tabs.getCurrent(function (tab) {
          window.open('https://www.google.com/');
        });
      },
      false
    );
  },
  false
);
