
# Overview of client server used in thsi app using SOCKET.IO

Socket.IO is a JavaScript library that enables real-time, bidirectional, and event-based communication between a client (typically a web browser) and 
a server (built with Node.js). It facilitates persistent connections, allowing data to be pushed from the server to clients and vice-versa without the need for constant polling
Real-time Communication:
Socket.IO is designed for applications requiring instant data exchange, such as chat applications, online gaming, live dashboards, and collaborative tools.
Bidirectional and Event-Based:
It allows both the client and server to send and receive custom events with data payloads.
Reliability and Fallback:
While it primarily utilizes WebSockets for efficient communication, Socket.IO provides automatic fallback to other transport mechanisms (like HTTP long-polling) if WebSockets are not supported by the client or network, ensuring a reliable connection.
Automatic Reconnection:
In case of connection loss, the Socket.IO client automatically attempts to reconnect, maintaining the real-time experience.
Broadcasting and Namespaces:
It offers features for sending messages to all connected clients, specific groups (rooms), or within defined namespaces, enabling structured communication patterns.
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

## 🚀 Run with Docker only UI part, for full e 2 e to work need to use docker compose.

- cd web-va
    ```bash
    docker build -t voice-assistant .
    docker run -p 3000:3000 --name va voice-assistant
    Visit: http://localhost:3000

   -  For local build:
    npm install
    npm start


## From root folder use docker compose to start both your project and ollama, which will use ollama llm image 
    docker-compose up --build 
- Once containers are up, use below command to pull model in ollama running server inside docker container.
    docker exec -it ollama-va ollama pull llama3
