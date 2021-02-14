import * as fs from "fs";
import * as path from "path";
const __dirname = path.resolve();
const baseDir = path.resolve(__dirname, "/tmp/out");

export default function saveFile(fileName, buf) {
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
  }

  fs.writeFileSync(path.resolve(baseDir, fileName), buf);
}
