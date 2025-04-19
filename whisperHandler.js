const { exec } = require("child_process");
const fs = require("fs");

async function transcribeAudio(filePath) {
  return new Promise((resolve, reject) => {
    exec(`whisper ${filePath} --language English --model base --output_format txt`, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }

      const transcriptPath = filePath.replace(/\.(wav|mp3|webm|m4a)$/, ".txt");
      fs.readFile(transcriptPath, "utf8", (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  });
}

module.exports = { transcribeAudio };
