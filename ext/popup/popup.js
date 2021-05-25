const api = {
  urlXlsx: "http://localhost:3000/scrape/xlsx",
  urlTxt: "http://localhost:3000/scrape/txt"
}

window.addEventListener('load', async () => {
  const icAccessebility = document.querySelector("#icon-accessibility");
  const txtAccessebility = document.querySelector("#text-accessibility");
  const toolsPanel = document.querySelector("#row-tools");
  const selectorsColumn = document.querySelector("#col-selectors");
  const btnExcel = document.querySelector("#btn-xlsx");
  const btnTxt = document.querySelector("#btn-txt");
  const btnAddSelector = document.querySelector("#btn-add-selector");

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let userId = null;
  let titleSelectors = [];
  let elementSelectors = [];

  // Get unique user id
  chrome.identity.getProfileUserInfo(userInfo => {
    userId = userInfo.id;
  });

  const getSelectors = () => {
    let res = [];

    for (let i = 0; i < elementSelectors.length; i++) {
      if (titleSelectors[i].value !== "" && elementSelectors[i].value !== "") {
        res.push({
          title: titleSelectors[i].value,
          tag: elementSelectors[i].value
        });
      }
    }

    return res;
  }

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
        url: tab.url,
        selectors: getSelectors()
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
  btnAddSelector.addEventListener('click', () => {
    const div = document.createElement('div');
    div.classList.add('selector')

    const inputSelector = document.createElement('input');
    const titleSelector = document.createElement('input');
    inputSelector.placeholder = "HTML element";
    titleSelector.placeholder = "Title";
    elementSelectors.push(inputSelector);
    titleSelectors.push(titleSelector);

    const btnRemove = document.createElement('button');
    btnRemove.textContent = "Remove"
    btnRemove.addEventListener('click', () => {
      div.style.display = 'none';
      elementSelectors.pop();
      titleSelectors.pop();
    });

    div.appendChild(inputSelector);
    div.appendChild(titleSelector);
    div.appendChild(btnRemove);
    selectorsColumn.appendChild(div);
  });
});
