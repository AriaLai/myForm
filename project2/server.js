const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 靜態資源目錄
app.use(express.static('vite-project'));

// 處理 POST 請求，將保存到 CSV 檔案中
app.post('/save', (req, res) => {
  const { name, gender, address, phone } = req.body;
  const data = `${name},${gender},${address},${phone}\n`;

  fs.appendFile('result.csv', data, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('保存失敗');
    } else {
      res.sendStatus(200);
    }
  });
});

// 處理 GET 請求，從 CSV 檔案中讀取並返回給前端
app.get('/contacts', (req, res) => {
  fs.readFile('result.csv', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('讀取失敗');
    } else {
      const lines = data.split('\n');
      const contacts = lines.map((line) => {
        const [name, gender, address, phone] = line.split(',');
        return { name, gender, address, phone };
      });
      res.json(contacts);
    }
  });
});

// 將重新導頁到 index.html
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/vite-project/index.html');
});

// 啟動服務器
app.listen(3000, () => {
  console.log('服務器運行在 http://localhost:3000');
});
