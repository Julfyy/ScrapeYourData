const api = {
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
  let userId = null;

  // Get unique user id
  chrome.identity.getProfileUserInfo(userInfo => {
    userId = userInfo.id;
  });

  const downloadFile = (view) => {
    updateUi('loading');

    // Configure url
    let url = "";
    if (view.srcElement.id == 'btn-txt') {
      url = api.urlTxt;
    } else {
      url = api.urlXlsx;
    }
    
    // Make request
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        url: tab.url
      })
    })
      .then(res => res.blob())
      .then(blob => {
        // Download file
        var file = window.URL.createObjectURL(blob);
        window.location.assign(file);
        updateUi(200)
      })
      .catch(e => {
        console.error(e)
        updateUi(400)
      });
  }

  const updateUi = (status) => {
    if (status === 200) {
      icAccessebility.src = "../img/yes.svg";
      txtAccessebility.textContent = "Parsed data is ready!";
    } else if (status === 400) {
      icAccessebility.src = "../img/no.svg";
      txtAccessebility.textContent = "This website is not parcelable yet.";
      toolsPanel.style.display = 'none';
    } else {
      icAccessebility.src = "../img/loading.gif";
      txtAccessebility.textContent = "Wait for file to be downloaded...";
    }
  }

  btnTxt.addEventListener('click', downloadFile)
  btnExcel.addEventListener('click', downloadFile)
});
