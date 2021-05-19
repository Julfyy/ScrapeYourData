const cheerio = require('cheerio');
const got = require('got');
const rp = require("request-promise");
const request = require('request');
const puppeteer = require('puppeteer')
const Excel = require('exceljs');

const test = async (url) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);

    const grabData = await page.evaluate(() => {
        const titles = document.querySelectorAll('.MenuItem-module__name___ibMRH');
        const arr = [];
        titles.forEach((element) => {
            arr.push(element.innerHTML);
        })

        return arr;
    });

    console.log(grabData);
    browser.close()

    // request(url, (error, response, html) => {
    //     if (!error) {
    //         const $ = cheerio.load(html);
    //         const item = $('.MenuItem-module__content___3-qJa');
    //         const p = item.find('p').text();
    //         console.log(item.html());
    //     }
    // });

    // var options = {
    //     url,
    //     transform: body => cherio.load(body)
    // }
    // rp(options).then(function($) {
    //     counter = 0;
    //     for (let item of $('div._31OrL')[0].children) {
    //         console.log(item);
    //         // if (counter % 2 == 0) {
    //         //     const obj = himalaya.parse(cherio.html(item.next.children));
    //         //     const str = '\t' + obj[1].children[0].children[0].content.toUpperCase().split(' ').join('_') + ' (\"'
    //         //         + obj[1].children[0].children[0].content + '\", \"' + obj[3].children[0].content + '\", '
    //         //         + '\"' + obj[5].children[0].content.split(' ')[0] + '\"),';
    //         //     writeStream.write(str + '\n');
    //         // }
    //         // counter++;
    //     }
    // });

    // got(url).then(response => {
    //     const $ = cheerio.load(response.body);
    //     $('section').each((link) => {
    //         console.log(link);
    //     });
    //     // console.log($('title')[0].children[0].data);
    // }).catch(err => {
    //     console.log(err);
    // });
}

// test('https://www.vgmusic.com/music/console/nintendo/nes');
test('https://wolt.com/pl/pol/warsaw/restaurant/heritage');

// module.exports = (url) => {
//     rp(url)
//         .then((html) => {
//             console.log($('._31OrL', html).text());
//         })
//     console.log(url);
//     var workbook = new Excel.Workbook();

//     workbook.creator = 'Me';
//     workbook.lastModifiedBy = 'Her';
//     workbook.created = new Date(1985, 8, 30);
//     workbook.modified = new Date();
//     workbook.lastPrinted = new Date(2016, 9, 27);
//     workbook.properties.date1904 = true;

//     workbook.views = [
//         {
//             x: 0, y: 0, width: 10000, height: 20000,
//             firstSheet: 0, activeTab: 1, visibility: 'visible'
//         }
//     ];
//     var worksheet = workbook.addWorksheet('My Sheet');
//     worksheet.columns = [
//         { header: 'Id', key: 'id', width: 10 },
//         { header: 'Name', key: 'name', width: 32 },
//         { header: 'D.O.B.', key: 'dob', width: 10, outlineLevel: 1, type: 'date', formulae: [new Date(2016, 0, 1)] }
//     ];

//     worksheet.addRow({ id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) });
//     worksheet.addRow({ id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7) });

//     return workbook;
// }