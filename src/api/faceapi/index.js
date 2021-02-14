import "@tensorflow/tfjs-node";
import * as faceapi from "face-api.js";
import fetch from "node-fetch";
import canvas from "canvas";

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData, fetch: fetch });

import path from "path";
const __dirname = path.resolve();
const MODELS_URL = path.join(__dirname, "/src/config/faceapi/weights");

import {
  faceDetectionNet,
  faceDetectionOptions,
} from "@config/faceapi/faceDetectionOptions.js";
// TODO:
import saveFile from "@config/faceapi/saveFile.js";

export const faceDetect = async (files) => {
  const resultImage = [];
  await faceDetectionNet.loadFromDisk(MODELS_URL);

  for (const file of files) {
    const img = await canvas.loadImage(file.path);
    const detections = await faceapi.detectAllFaces(img, faceDetectionOptions);
    // const faceImages = await faceapi.extractFaces(img, detections);

    const out = faceapi.createCanvasFromMedia(img);
    faceapi.draw.drawDetections(out, detections);

    saveFile(file.originalname, out.toBuffer("image/jpeg"));
    console.log(`done, saved results file:${file.originalname}`);
  }

  return resultImage;
};
