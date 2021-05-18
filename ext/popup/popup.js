const urls = [
  'www.example.com',
  'www.pyszne.pl/menu'
];

window.addEventListener('load', async () => {
  const icAccessebility = document.querySelector("#icon-accessibility");
  const txtAccessebility = document.querySelector("#text-accessibility");
  const toolsPanel = document.querySelector("#row-tools");
  const btnExcel = document.querySelector("#btn-xlsx");
  const btnTxt = document.querySelector("#btn-txt");

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const isAvailable = () => {
    console.log(tab)
    for (const availableUrl of urls) {
      if (tab.url.includes(availableUrl)) {
        return true
      }
    }
    
    return false;
  }

  if (isAvailable()) {
    icAccessebility.src = "../img/yes.svg";
    txtAccessebility.textContent = "Parsed data is ready to be saved!"
  } else {
    icAccessebility.src = "../img/no.svg";
    txtAccessebility.textContent = "This website is not parcelable yet."
    toolsPanel.style.display = 'none';
  }

  btnExcel.addEventListener("click", () => {
    var request = new XMLHttpRequest();
    request.open("GET", "https://www.pyszne.pl/menu/polo-pizza-warszawa?utm_campaign=foodorder&utm_medium=organic&utm_source=google#kategoria_pizza", true);
    request.responseType = "document";
    request.onload = (e) => {
      console.log(request)
      if (request.readyState === 4) {
        if (request.status === 200) {
          var a = request.responseXML.querySelector("div.result:nth-child(1) > div:nth-child(1) > h2:nth-child(1) > a:nth-child(1)");
          console.log(a.href);
          document.body.appendChild(a);
        } else {
          console.error(request.status, request.statusText);
        }
      }
    };
    request.onerror = function (e) {
      console.error(request.status, request.statusText);
    };
    request.send(null);
  });
});
