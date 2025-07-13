const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

async function synthesizeSpeech(text) {
  return new Promise((resolve, reject) => {
    const filename = `public/tts/${uuidv4()}.wav`;

    const command = `tts --text "${text}" --out_path ${filename}`;
    exec(command, (err) => {
      if (err) return reject(err);
      resolve(filename);
    });
    
  });
}

module.exports = { synthesizeSpeech };
