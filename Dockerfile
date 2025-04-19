FROM node:18

# Install system and Python dependencies
RUN apt-get update && \
    apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    pipx \
    ffmpeg \
    git \
    curl \
    build-essential \
    libasound2-dev \
    libsndfile1 && \
    pipx ensurepath

# Install latest stable Rust using rustup
RUN curl https://sh.rustup.rs -sSf | bash -s -- -y
ENV PATH="/root/.cargo/bin:/root/.local/bin:$PATH"
ENV PATH="/root/.local/pipx/venvs/openai-whisper/bin:$PATH"
ENV PATH="/root/.local/pipx/venvs/TTS/bin:/root/.local/bin:$PATH"


# Install Python tools using pipx (in isolated envs)
RUN pipx install --include-deps openai-whisper && \
    pipx install --include-deps TTS

# Setup Node app
WORKDIR /app
COPY . .

RUN npm install
RUN mkdir -p uploads public/tts

EXPOSE 3000
CMD ["npm", "start"]
