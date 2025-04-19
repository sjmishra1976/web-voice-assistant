FROM node:18

# System setup
RUN apt-get update && \
    apt-get install -y python3 python3-pip ffmpeg && \
    pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu && \
    pip3 install openai-whisper TTS

# App setup
WORKDIR /app
COPY . .

# Install Node dependencies
RUN npm install

# Prepare public/tts dir
RUN mkdir -p public/tts uploads

# Expose port
EXPOSE 3000

CMD ["npm", "start"]
