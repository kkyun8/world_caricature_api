// TODO: log set
import path from "path";
const __dirname = path.resolve();

import { payment } from "@api/square/payment.js";
import { faceDetect } from "@api/faceapi/index.js";

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import multer from "multer";

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
 * 顔認識
 */
const upload = multer({ dest: "tmp/faceapi/uploaded" });
// TODO: 全判的な処理再検討
app.post("/face-api", upload.array("files"), async (req, res) => {
  // TODO: delete s3 bucket orderNumber
  // deleteS3Bucket(req.orderNumber)
  const resultImgs = await faceDetect(req.files);
  // TODO: create s3 bucket, upload imgs
  res.send(JSON.stringify({ ok: true, resultImgs }));
});

app.listen(port, () => console.log(`listening on - http://localhost:${port}`));
