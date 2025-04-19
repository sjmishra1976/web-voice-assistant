FROM node:18

# --- OS & Python dependencies ---
RUN apt-get update && \
    apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    pipx \
    ffmpeg \
    git \
    curl \
    build-essential && \
    pipx ensurepath

# Ensure pipx is in PATH
ENV PATH="/root/.local/bin:$PATH"

# --- Install Python tools using pipx ---
RUN pipx install openai-whisper && \
    pipx install TTS

# --- App setup ---
WORKDIR /app
COPY . .

# Install Node dependencies
RUN npm install

# Ensure folders exist
RUN mkdir -p uploads public/tts

# Expose port
EXPOSE 3000

# --- Start Node server ---
CMD ["npm", "start"]
