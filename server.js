// TODO: log set
import path from "path";
const __dirname = path.resolve();

import { deleteTmpOutDir } from "./src/config/index.js";
import { payment } from "./src/api/square/payment.js";
import { faceDetect } from "./src/api/faceapi/index.js";
import { deleteAllOrderPicture, putOrderPicture } from "./src/api/aws/s3.js";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import multer from "multer";

import { lineHandleEvent } from "./src/api/line/index.js";

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname));

/**
 * TODO: config setup
 */

/**
 * 決済処理
 */
app.post("/process-payment", (req, res) => {
  payment(req.body);
  // TODO: response result
  res.send(JSON.stringify({ ok: true }));
  //   res.status(200).json({
  //     title: "Payment Successful",
  //     result: result,
  //   });
  //   res.status(500).json({
  //     title: "Payment Failure",
  //     result: error.response.text,
  //   });
  // }
});

/**
 * 添付ファイルから顔認識、写真保存
 */
const upload = multer({ dest: "tmp/faceapi/uploaded" });
// TODO: 全判的な処理再検討
app.post("/face-api", upload.array("files"), async (req, res) => {
  try {
    const startTime = new Date().getTime();
    const { orderNumber } = req.body;
    console.log(
      `---------------start /face-api 対象orderNumber:${orderNumber}---------------`
    );

    // すでにバケットにOrderNumber名でフォルダが存在する場合、削除する
    await deleteAllOrderPicture(orderNumber);

    // Webからの添付ファイルから顔認識、
    const resultImgs = await faceDetect(req.files);

    const putResult = await putOrderPicture(req.body.orderNumber, resultImgs);

    const ProcTime = new Date().getTime() - startTime;
    console.log(
      `---------------end /face-api 実行時間:${ProcTime}---------------`
    );

    res.send(
      JSON.stringify({ ok: putResult.ok, orderNumber: req.body.orderNumber })
    );
    // tmp/outフォルダ削除
    deleteTmpOutDir();
  } catch {
    res.send(JSON.stringify({ ok: false }));
  }
});

/**
 * line-bot message return
 */
app.post("/line-callback", (req, res) => {
  Promise.all(req.body.events.map(lineHandleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

app.listen(port, () => console.log(`listening on - http://localhost:${port}`));
