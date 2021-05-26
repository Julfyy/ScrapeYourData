const express = require('express');
const router = express.Router();
const Excel = require('exceljs');

const Glovo = require('./patterns/Glovo.js');

const isAvailable = function(req, res, next) {
    const url = req.body.url;
    
    if (url.includes('glovo')) {
        next();
    } else {
        res.status(400).json({ status: 400, message: "The website is not parcable." });
    }
}

router.use(isAvailable);
  
router.get('/', (_, res) => {
  res.send('Server works');
});

router.post('/scrape/xlsx', (req, res) => {
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=Data.xlsx");

    Glovo.getXlsx(req.body)
        .then(file => {
            file.xlsx.write(res)
                .then(function (_) {
                    res.end();
                });
        })
        .catch(e => {
            console.error(e)
            res.status(400).json({ status: 400, message: "Bad url." });
        });
});

router.post('/scrape/txt', (req, res) => {
    res.setHeader('Content-Type', "application/octet-stream");
    res.setHeader('Content-Disposition', 'attachment; filename=Data.txt');

    Glovo.getTxt(req.body)
        .then(file => {
            res.send(file);
        })
});

module.exports = router;
