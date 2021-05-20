const express = require('express');
const router = express.Router();

const Glovo = require('./patterns/Glovo.js');

const urls = ['https://glovoapp.com/'];

const userUrls = new Map();

router.get('/', (_, res) => {
  res.send('Server works');
});

router.post('/isAvailable', (req, res) => {
  const url = req.body.url;
  const requestId = new Date().getTime();

  for (const availableUrl of urls) {
    if (url.includes(availableUrl)) {
      res.status(200).json({
        isAvailable: true,
        id: requestId,
      });

      userUrls.set(requestId, url);
      return;
    }
  }

  res.status(200).json({ isAvailable: false });
});

router.get('/scrape/xlsx/:id', (req, res) => {
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.setHeader('Content-Disposition', 'attachment; filename=' + 'Data.xlsx');

  const key = Number(req.params.id);
  Glovo(userUrls.get(key)).then((file) => {
    file.xlsx.write(res).then(function () {
      res.end();
    });
  });
});

module.exports = router;
