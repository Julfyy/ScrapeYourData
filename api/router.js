const express = require('express');
const router = express.Router();

const Pyszne = require('./patterns/Pyszne.js');

const urls = [
    'www.example.com',
    'www.pyszne.pl/menu'
  ];

router.get('/', (_, res) => {
    res.send('Server works');
});

router.post('/isAvailable', (req, res) => {
    const url = req.body.url;
    for (const availableUrl of urls) {
        if (url.includes(availableUrl)) {
            res.status(200).json({
                isAvailable: true,
                id: urls.indexOf(availableUrl)
            });
            return;
        }
    }

    res.status(200).json({ isAvailable: false });
});

router.get('/scrape/xlsx/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
    Pyszne(urls[req.params.id]).xlsx.write(res)
        .then(function (data) {
            res.end();
        });
});

module.exports = router;
