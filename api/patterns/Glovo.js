const puppeteer = require('puppeteer');
const Excel = require('exceljs');

const getData = async (request) => {
    // console.log(request)
    const url = request.url;
    // const url = 'https://glovoapp.com/pl/pl/warszawa/mother-india-waw/';
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    console.log(url);
    await page.goto(url);

    const data = await page.evaluate((selectors) => {
        const obj = [];

        for (let selector of selectors) {
            const elements = document.querySelectorAll(selector.tag);
            let content = [];

            for (let i = 0; i < elements.length; i++) {
                content.push(elements[i].innerHTML === undefined ? '' : elements[i].innerHTML.trim());
            }

            obj.push({ key: selector.title, content });
        }

        return obj;
    }, request.selectors);

    browser.close();
    console.log(data);
    return data;
};

const findMaxColumnSize = (data) => {
  let max = data[0].content.length;

  for (let col of data) {
    if (max < col.content.length) {
      max = col.content.length;
    }
  }

  return max;
}

module.exports = async (request) => {
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
    let worksheet = workbook.addWorksheet('Glovo');

    let formattedData = [];
    const maxSize = findMaxColumnSize(data);
    for (let i = 0; i < maxSize; i++) {
      let row = [];
      for (let elem of data) {
        row.push(elem.content[i] === undefined ? '' : elem.content[i]);
      }
      formattedData.push(row);
    }

    let columns = [];
    for (let i = 0; i < data.length; i++) {
      columns.push({ header: data[i].key, key: `${i}`, width: 100});
    }
    worksheet.columns = columns;

    console.log(columns)
    for (let row of formattedData) {
      let endRow = {};
      let i = 0;
      for (let item of row) {
        const jsonItem = JSON.parse(`{ "${i++}": "${item}" }`)
        Object.assign(endRow, jsonItem)
      }
      console.log(endRow)
      worksheet.addRow(endRow);
    }

    return workbook;
};
