import * as fs from "fs";
import * as path from "path";
import { tmpOutDir } from "../index.js";

export default function saveFile(fileName, buf) {
  if (!fs.existsSync(tmpOutDir)) {
    fs.mkdirSync(tmpOutDir);
  }

  fs.writeFileSync(path.resolve(tmpOutDir, fileName), buf);
}
