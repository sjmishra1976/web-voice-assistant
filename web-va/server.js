require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

const { transcribeAudio } = require("./whisperHandler");
const { synthesizeSpeech } = require("./ttsHandler");
const { handleMCPMessage } = require("./mcpHandler");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// Ensure directories exist
const ensureDir = (dir) => !fs.existsSync(dir) && fs.mkdirSync(dir, { recursive: true });
ensureDir("uploads");
ensureDir("public/tts");

app.use(express.static("public"));
app.use("/tts", express.static("public/tts"));

// WebSocket (optional, useful for live updates)
io.on("connection", (socket) => {
  console.log("🔌 Client connected");
  socket.on("disconnect", () => console.log("❌ Client disconnected"));
});

// Handle voice input
app.post("/voice", (req, res) => {
  const form = formidable({ uploadDir: "./uploads", keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Upload error:", err);
      return res.status(500).send({ error: "Upload failed" });
    }

    try {
      const audioFile = files.audio;
      const audioPath = Array.isArray(audioFile) ? audioFile[0].filepath : audioFile.filepath;

      const transcript = await transcribeAudio(audioPath);
      const agentReply = await handleMCPMessage(transcript, "voice", "finance_query");
      const ttsPath = await synthesizeSpeech(agentReply.response);

      const relativePath = ttsPath.replace("public/", "");
      res.json({ transcript, response: agentReply.response, ttsUrl: `/${relativePath}` });
    } catch (err) {
      console.error("Voice processing error:", err);
      res.status(500).send({ error: "Voice processing failed" });
    }
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Voice Assistant running at http://localhost:${PORT}`);
});
