const api = {
  urlIsAvailable: "http://localhost:3000/isAvailable",
  urlXlsx: "http://localhost:3000/scrape/xlsx",
  urlTxt: "http://localhost:3000/scrape/txt"
}

window.addEventListener('load', async () => {
  const icAccessebility = document.querySelector("#icon-accessibility");
  const txtAccessebility = document.querySelector("#text-accessibility");
  const toolsPanel = document.querySelector("#row-tools");
  const btnExcel = document.querySelector("#btn-xlsx");
  const btnTxt = document.querySelector("#btn-txt");

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let websiteId = null;

  fetch(api.urlIsAvailable, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: tab.url
    })
  }).then(response => {
    if (response.ok) {
      response.json().then(json => {
        websiteId = json.id;
        updateUi(json.isAvailable);
      });
    } else {
      updateUi(false);
    }
  });

  const updateUi = (isAvailable) => {
    if (isAvailable) {
      icAccessebility.src = "../img/yes.svg";
      txtAccessebility.textContent = "Parsed data is ready to be saved!";
      btnExcel.href = `${api.urlXlsx}/${websiteId}`;
      btnTxt.href = `${api.urlTxt}/${websiteId}`;
    } else {
      icAccessebility.src = "../img/no.svg";
      txtAccessebility.textContent = "This website is not parcelable yet.";
      toolsPanel.style.display = 'none';
    }
  }
});
