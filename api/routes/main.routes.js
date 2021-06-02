const { Router } = require('express');
const router = Router();

const { getXlsx, getTxt } = require('../Parser.js');

router.post('/scrape/xlsx', (req, res) => {
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=Data.xlsx");

    getXlsx(req.body)
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

    getTxt(req.body)
        .then(file => {
            res.send(file);
        })
        .catch(e => {
            console.error(e)
            res.status(400).json({ status: 400, message: "Bad url." });
        });
});

module.exports = router;
