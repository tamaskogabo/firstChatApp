FROM eclipse-temurin:latest
RUN mkdir /opt/chat-app
COPY ./target/firstChatApp-0.0.1-SNAPSHOT.jar /opt/chat-app
EXPOSE 8080
RUN adduser --disabled-password juser
USER juser
CMD "java" "-jar" "/opt/chat-app/firstChatApp-0.0.1-SNAPSHOT.jar"

# build and run commands:
# docker build -t chat-app -f Dockerfile .
# docker run --name chat-app --rm -dp 8080:8080 chat-app