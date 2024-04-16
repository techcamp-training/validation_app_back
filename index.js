const express = require("express");
const app = express();
app.use(express.json());

// 追記
// const { body, validationResult } = require('express-validator');
// app.use(express.urlencoded({ extended: true }));


// cors対策
const cors = require('cors')
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// prismaの初期化
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.post('/register', async(req, res) => {
try {
  //入力データの検証が成功した後に、データベースへの保存を実施する
  const user = await prisma.user.create({data:  req.body });
  res.json(user);
  }catch(error) {
    res.status(500).send("保存ができませんでした", error);
  }
})


// ポート3000を使用して、読み込みができるかテストする
app.listen(3000, () => {
  console.log("listening on localhost port 3000");
})
