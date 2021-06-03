// const api = {
//   urlXlsx: 'http://localhost:3000/scrape/xlsx',
//   urlTxt: 'http://localhost:3000/scrape/txt',
//   urlGetSelectors: 'http://localhost:3000/user/getSelectors',
// };

const api = {
  urlXlsx: 'https://scrape-your-data.herokuapp.com/scrape/xlsx',
  urlTxt: 'https://scrape-your-data.herokuapp.com/scrape/txt',
  urlGetSelectors: 'https://scrape-your-data.herokuapp.com/user/getSelectors',
};

window.addEventListener('load', async () => {
  const icAccessebility = document.querySelector('#icon-accessibility');
  const txtAccessebility = document.querySelector('#text-accessibility');
  const txtUserInfo = document.querySelector('#user-info');
  const toolsPanel = document.querySelector('#row-tools');
  const selectorsColumn = document.querySelector('#col-selectors');
  const btnExcel = document.querySelector('#btn-xlsx');
  const btnTxt = document.querySelector('#btn-txt');
  const btnAddSelector = document.querySelector('#btn-add-selector');

  //[tab] is a destructuring assignment to unpack a tab property from returned array
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  let userId = null;
  let titleSelectors = [];
  let elementSelectors = [];

  // Get unique identifier of a Chrome account
  chrome.identity.getProfileUserInfo((userInfo) => {
    userId = userInfo.id;

    txtUserInfo.textContent = userId;
    fetch(api.urlGetSelectors, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            for (let selector of json.selectors) {
              createSelectorView(selector.tag, selector.title);
            }
          });
          updateUi(200);
        } else {
          updateUi(400);
        }
      })
      .catch((e) => {
        console.error(e);
        updateUi(400);
      });
  });

  const getSelectors = () => {
    let res = [];

    for (let i = 0; i < elementSelectors.length; i++) {
      if (titleSelectors[i].value !== '' && elementSelectors[i].value !== '') {
        res.push({
          title: titleSelectors[i].value,
          tag: elementSelectors[i].value,
        });
      }
    }

    return res;
  };

  const downloadFile = (view) => {
    updateUi('loading');

    const selectors = getSelectors();
    if (selectors.length < 1) {
      alert('No selectors added!');
      return;
    }

    // Configure url
    let url = '';
    if (view.srcElement.id == 'btn-txt') {
      url = api.urlTxt;
    } else {
      url = api.urlXlsx;
    }

    // Make a request
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        url: tab.url,
        selectors,
      }),
    })
      .then((res) => res.blob())
      .then((blob) => {
        // Download file
        var file = window.URL.createObjectURL(blob);
        window.location.assign(file);
        updateUi(200);
      })
      .catch((e) => {
        console.error(e);
        updateUi(400);
      });
  };

  const updateUi = (status) => {
    if (status === 200) {
      txtAccessebility.textContent = 'Parser is ready!';
    } else if (status === 400) {
      txtAccessebility.textContent = 'Couldn`t load selectors';
      toolsPanel.style.display = 'none';
    } else {
      txtAccessebility.textContent = 'Wait for file to be downloaded...';
    }
  };

  const createSelectorView = (tag, title) => {
    const div = document.createElement('div');
    div.classList.add('selector');

    const inputSelector = document.createElement('input');
    const titleSelector = document.createElement('input');
    inputSelector.placeholder = 'HTML element';
    titleSelector.placeholder = 'Title';
    elementSelectors.push(inputSelector);
    titleSelectors.push(titleSelector);

    const btnRemove = document.createElement('button');
    btnRemove.textContent = 'Remove';
    btnRemove.addEventListener('click', () => {
      div.style.display = 'none';
      elementSelectors.pop();
      titleSelectors.pop();
    });

    if (tag) {
      inputSelector.value = tag;
    }

    if (title) {
      titleSelector.value = title;
    }

    div.appendChild(inputSelector);
    div.appendChild(titleSelector);
    div.appendChild(btnRemove);
    selectorsColumn.appendChild(div);
  };

  btnTxt.addEventListener('click', downloadFile);
  btnExcel.addEventListener('click', downloadFile);
  btnAddSelector.addEventListener('click', () => {
    createSelectorView();
  });
});
