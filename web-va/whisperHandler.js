const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

async function transcribeAudio(filePath) {
  return new Promise((resolve, reject) => {
    exec(`whisper ${filePath} --language English --model base --output_format txt --output_dir uploads`, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      const transcriptPath = path.join("uploads", path.basename(filePath).replace(/\.(webm|wav|mp3|m4a)$/, ".txt"));
      fs.readFile(transcriptPath, "utf8", (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  });
}

module.exports = { transcribeAudio };
