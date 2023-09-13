@ECHO OFF
docker build -t chat-app -f Dockerfile .
docker run --name chat-app --rm -dp 8080:8080 chat-app