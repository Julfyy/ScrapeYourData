const { Router } = require('express');
const router = Router();
const User = require('../models/User.js')

const Glovo = require('../Parser.js');
  
const saveSelectors = (req, res, next) => {
    const userId = req.body.userId;
    User.findOneAndUpdate({ id: userId }, { selectors: req.body.selectors })
        .catch(e => {
            console.error(e)
            return;
        });

    next();
}

router.use(saveSelectors);

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

    console.log(req.body);

    Glovo.getTxt(req.body)
        .then(file => {
            res.send(file);
        })
});

module.exports = router;
