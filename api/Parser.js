const puppeteer = require('puppeteer');

const {
  setColumns,
  formatData,
  createRowFromArray,
  initWorkBook,
} = require('./utils/workbookUtils');
const { findMaxColumnSize } = require('./utils/arrayUtils');
const fs = require('fs');

const getData = async (request) => {
  const url = request.url;
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto(url);

  const data = await page.evaluate((selectors) => {
    function stripHtml(html) {
      let tmp = document.createElement('div');
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || '';
    }

    const result = [];

    for (let selector of selectors) {
      const elements = document.querySelectorAll(selector.tag);
      let content = [];

      for (let i = 0; i < elements.length; i++) {
        content.push(
          elements[i].innerHTML === undefined
            ? ''
            : stripHtml(elements[i].innerHTML).trim()
        );
      }

      result.push({ key: selector.title, content });
    }

    return result;
  }, request.selectors);

  browser.close();

  // fs.writeFile('bla.json', JSON.stringify(data), 'utf8', () => {
  //   console.log('done');
  // });
  return data;
};

const getXlsx = async (request) => {
  const data = await getData(request);

  // Create workbook
  let workbook = initWorkBook();

  // Create columns with names
  worksheet = setColumns(data, workbook.addWorksheet('Sheet1'));

  // Format exicting data
  let formattedData = formatData(data);

  // Push data row by row
  for (let row of formattedData) {
    worksheet.addRow(createRowFromArray(row));
  }

  return workbook;
};

const getTxt = async (request) => {
  const data = await getData(request);
  let formattedData = [];

  const maxSize = findMaxColumnSize(data);
  for (let i = 0; i < maxSize; i++) {
    let row = [];
    for (let elem of data) {
      row.push(elem.content[i] === undefined ? '' : elem.content[i]);
    }
    formattedData.push(row);
  }

  let file = '';
  let i = 1;
  for (let row of formattedData) {
    let endRow = `${i}. `;
    for (let item of row) {
      if (item != '') endRow += `${item} |`;
    }
    i++;
    file += `\n${endRow}`;
  }

  return file;
};

async function hello() {
  await getXlsx({
    url: 'https://glovoapp.com/pl/pl/warszawa/domino-s-pizza-waw1/pizze_50302694/',
    selectors: [
      { title: 'title', tag: 'h4.title' },
      { title: 'description', tag: 'div.description' },
      { title: 'price', tag: 'div.product-price' },
    ],
  });
}

hello();

module.exports = {
  getXlsx,
  getTxt,
};
