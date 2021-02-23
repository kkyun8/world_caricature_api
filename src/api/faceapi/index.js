import { tmpOutDirPath, modelsDir } from "../../config/index.js";
import "@tensorflow/tfjs-node";
import * as faceapi from "face-api.js";
import fetch from "node-fetch";
import canvas from "canvas";

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData, fetch: fetch });

import {
  faceDetectionNet,
  faceDetectionOptions,
} from "../../config/faceapi/faceDetectionOptions.js";
import { saveFile } from "../../config/index.js";

/**
 *
 * @param {webから受け取った写真ファイル（複数）} files
 */
export const faceDetect = async (files) => {
  const resultImages = [];
  await faceDetectionNet.loadFromDisk(modelsDir);
  let imgCnt = 0;

  for (const file of files) {
    // 顔認識
    const now = Date.now();
    const img = await canvas.loadImage(file.path);
    const detections = await faceapi.detectAllFaces(img, faceDetectionOptions);

    const faceImages = await faceapi.extractFaces(img, detections);

    const out = faceapi.createCanvasFromMedia(img);

    faceapi.draw.drawDetections(out, detections);
    const originfilename = `${now}_origin_${imgCnt}.jpg`;
    saveFile(originfilename, out.toBuffer("image/jpeg"));
    console.log(`done, saved origin img file:${originfilename}`);

    const filepath = `${tmpOutDirPath}/${originfilename}`;
    const filename = originfilename;
    resultImages.push({ filepath, filename });

    imgCnt++;

    let fimgCnt = 0;
    for (const fimg of faceImages) {
      // 顔だけファイル出力
      const fcfilename = `${now}_face_${fimgCnt}.jpg`;
      const fbf = fimg.toBuffer();
      saveFile(fcfilename, fbf);
      console.log(`done, saved face cut img file:${fcfilename}`);

      fimgCnt++;
      const filepath = `${tmpOutDirPath}/${fcfilename}`;
      const filename = fcfilename;
      resultImages.push({ filepath, filename });
    }
  }

  return resultImages;
};
