const cheerio = require('cheerio');
const request = require('request');

// const test = async (url) => {
//     request(url, (error, response, html) => {
//         if (!error) {
//             console.log(html);
//             const $ = cheerio.load(html);
//             const item = $('h4.title').map((el, bla) => {
//                 console.log(bla.children[0].data);
//             });
//             // const item = $('h4.m-item__title.restaurant-menu__dish-name').map((el, bla) => {
//             //     console.log(bla.children[0].data);
//             // });
//             // const p = item.find('p').text();
//             console.log(item.text());
//         }
//     });
// }

// test('https://glovoapp.com/pl/pl/gdansk/rosmarino-gda/');
