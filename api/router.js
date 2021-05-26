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
    res.setHeader("Content-Disposition", "attachment; filename=" + "Data.xlsx");

    const url = req.body.url;

    Glovo(req.body)
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
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=" + "Data.xlsx");

    console.log(req.body)

    var workbook = new Excel.Workbook();
    var worksheet = workbook.addWorksheet('My Sheet');
    worksheet.columns = [
        { header: 'Id', key: 'id', width: 10 },
        { header: 'Name', key: 'name', width: 32 },
        { header: 'D.O.B.', key: 'DOB', width: 10 }
    ];
    worksheet.addRow({id: 1, name: 'John Doe', dob: new Date(1970,1,1)});
    worksheet.addRow({id: 2, name: 'Jane Doe', dob: new Date(1965,1,7)});
    workbook.xlsx.write(res)
                .then(function (_) {
                    res.end();
                });
});

module.exports = router;
