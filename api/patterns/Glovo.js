const puppeteer = require('puppeteer');
const Excel = require('exceljs');

const getData = async (url) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  const data = await page.evaluate(() => {
    const titles = document.querySelectorAll('h4.title');
    const descriptions = document.querySelectorAll('div.description span span');
    const prices = document.querySelectorAll('span.product-price__effective');
    const arr = [];

    // const regexPrice = /[0-9]*\,?\.?[0-9]*/

    for (let i = 0; i < titles.length; i++) {
      arr.push({
        title: titles[i] === undefined ? '' : titles[i].innerHTML,
        description: descriptions[i] === undefined ? '' : descriptions[i].innerHTML,
        price: prices[i] === undefined ? '' : prices[i].innerHTML, //.match(regexPrice)
      });
    }

    return arr;
  });

  console.log(data);
  return data;
};

module.exports = async (url) => {
  const data = await getData(url);

  var workbook = new Excel.Workbook();

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
  var worksheet = workbook.addWorksheet('Glovo');
  worksheet.columns = [
    { header: 'Title', key: 'title', width: 30 },
    { header: 'Description', key: 'description', width: 100 },
    { header: 'Price', key: 'price', width: 10 },
  ];

  data.forEach((value) => {
    worksheet.addRow(value);
  });

  return workbook;
};
// const puppeteer = require('puppeteer');
// const Excel = require('exceljs');

// const getData = async (request) => {
//     const url = request.url;
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();
//     console.log(url);
//     await page.goto(url);

//     const data = await page.evaluate((selectors) => {
//         const map = new Map();

//         for (let selector of selectors) {
//             const elements = document.querySelectorAll("h4.title");
//             let content = [];

//             console.log(selector.tag + " -- " + selector.title + " --- " + elements.length)
//             for (let i = 0; i < elements.length; i++) {
//                 console.error(elem.innerHTML)
//                 content.push(elements[i].innerHTML === undefined ? '' : elements[i].innerHTML);
//             }

//             map.set(selector.title, content);
//         }

//         console.log(map)

//         return map;
//     }, request.selectors);

//     console.log(data);
//     return data;
// };

// module.exports = async (request) => {
//     const data = await getData(request);

//     var workbook = new Excel.Workbook();

//     workbook.creator = 'Me';
//     workbook.lastModifiedBy = 'Her';
//     workbook.created = new Date();
//     workbook.modified = new Date();
//     workbook.lastPrinted = new Date();
//     workbook.properties.date1904 = true;

//     workbook.views = [
//         {
//             x: 0,
//             y: 0,
//             width: 10000,
//             height: 20000,
//             firstSheet: 0,
//             activeTab: 1,
//             visibility: 'visible',
//         },
//     ];
//     var worksheet = workbook.addWorksheet('Glovo');
//     let columns = [];
//     for (let key of data.keys) {
//         columns.push({ header: key, key: `_${key}`, width: 100});
//     }
//     worksheet.columns = columns;

//     data.forEach((value, key) => {
//         worksheet.addRow(value);
//     });

//     return workbook;
// };
