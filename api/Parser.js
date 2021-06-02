const puppeteer = require('puppeteer');
const Excel = require('exceljs');

const { findMaxColumnSize } = require('./utils/arrayUtils')

const getData = async (request) => {
    const url = request.url;
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);

    const data = await page.evaluate((selectors) => {
        function stripHtml(html) {
          let tmp = document.createElement('div');
          tmp.innerHTML = html;
          return tmp.textContent || tmp.innerText || "";
        }

        const result = [];

        for (let selector of selectors) {
            const elements = document.querySelectorAll(selector.tag);
            let content = [];

            for (let i = 0; i < elements.length; i++) {
                content.push(elements[i].innerHTML === undefined ? '' : stripHtml(elements[i].innerHTML).trim());
            }

            result.push({ key: selector.title, content });
        }

        return result;
    }, request.selectors);

    browser.close();
    return data;
};

const getXlsx = async (request) => {
    const data = await getData(request);

    let workbook = new Excel.Workbook();

    workbook.creator = 'Me';
    workbook.lastModifiedBy = 'Her';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();
    workbook.properties.date1904 = true;

    workbook.views = [
        {
            x: 0,
            y: 0,
            width: 10000,
            height: 20000,
            firstSheet: 0,
            activeTab: 1,
            visibility: 'visible',
        },
    ];
    let worksheet = workbook.addWorksheet('Sheet1');

    let columns = [];
    for (let i = 0; i < data.length; i++) {
      columns.push({ header: data[i].key, key: `${i}`, width: 70});
    }
    worksheet.columns = columns;

    let formattedData = [];
    const maxSize = findMaxColumnSize(data);
    for (let i = 0; i < maxSize; i++) {
      let row = [];
      for (let elem of data) {
        row.push(elem.content[i] === undefined ? '' : elem.content[i]);
      }
      formattedData.push(row);
    }

    for (let row of formattedData) {
      let endRow = {};
      let i = 0;
      for (let item of row) {
        const jsonItem = JSON.parse(`{ "${i++}": "${item}" }`)
        Object.assign(endRow, jsonItem)
      }
      
      worksheet.addRow(endRow);
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

  let file = "";
  let i = 1;
  for (let row of formattedData) {
    let endRow = `${i}. `;
    for (let item of row) {
      if (item != '')
        endRow += `${item} |`
    }
    i++
    file += `\n${endRow}`
  }

  return file;
}

module.exports = {
  getXlsx,
  getTxt
}
