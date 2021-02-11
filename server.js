// TODO: log set
import path from "path";
const __dirname = path.resolve();

import { payment } from "@api/square/payment.js";

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname));

app.post("/process-payment", async (req) => {
  payment(req.body);
  // TODO:
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

app.listen(port, () => console.log(`listening on - http://localhost:${port}`));
