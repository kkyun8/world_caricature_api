import dotenv from "dotenv";
dotenv.config();
import * as fs from "fs";
import * as path from "path";

export const __dirname = path.resolve();
export const tmpOutDirPath = path.resolve(__dirname, "tmp/out");
export const tmpFaceapiUploadedDirPath = path.resolve(
  __dirname,
  "tmp/faceapi/uploaded"
);

export const modelsDir = path.join(__dirname, "/src/config/faceapi/weights");

export const webUrl = process.env.WEB_URL;

export function saveFile(fileName, buf) {
  if (!fs.existsSync(tmpOutDirPath)) {
    fs.mkdirSync(tmpOutDirPath);
  }

  fs.writeFileSync(path.resolve(tmpOutDirPath, fileName), buf);
}

export const deleteTmpData = (dirPath) => {
  fs.rmdirSync(dirPath, { recursive: true });

  // 削除後、dir再作成
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};
