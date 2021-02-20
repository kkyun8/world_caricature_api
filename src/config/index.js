import * as fs from "fs";
import * as path from "path";

export const __dirname = path.resolve();
export const tmpOutDir = path.resolve(__dirname, "tmp/out");
export const modelsDir = path.join(__dirname, "/src/config/faceapi/weights");

export function saveFile(fileName, buf) {
  if (!fs.existsSync(tmpOutDir)) {
    fs.mkdirSync(tmpOutDir);
  }

  fs.writeFileSync(path.resolve(tmpOutDir, fileName), buf);
}

export const deleteTmpOutDir = () => {
  fs.rmdirSync(tmpOutDir, { recursive: true });
};
