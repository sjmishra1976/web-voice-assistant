# High-Level Voice Bot Flow:

User speaks into mic / phone call

Voice stream → Speech-to-Text (STT)

Transcribed text → LLM (e.g., GPT or agentic model)

LLM response → Text-to-Speech (TTS)

Send synthesized voice stream back to user



# 🎙️ Dockerized Voice Assistant (STT + OpenAI + TTS)

This project uses:
- 🗣️ Whisper (speech-to-text)
- 🤖 OpenAI GPT (agentic assistant for fintech)
- 🔊 Coqui TTS (text-to-speech)
- ⚡ Node.js Express server + HTML frontend

## 🚀 Run with Docker

```bash
docker build -t voice-assistant .
docker run -p 3000:3000 --name va voice-assistant

Visit: http://localhost:3000