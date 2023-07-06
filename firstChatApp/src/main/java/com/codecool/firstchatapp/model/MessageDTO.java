package com.codecool.firstchatapp.model;

public class MessageDTO {
    private String from;
    private String text;
    private String to;
    private MessageStatus messageStatus;

    public MessageDTO(String from, String text, String to, MessageStatus messageStatus) {
        this.from = from;
        this.text = text;
        this.to = to;
        this.messageStatus = messageStatus;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public MessageStatus getMessageStatus() {
        return messageStatus;
    }

    public void setMessageStatus(MessageStatus messageStatus) {
        this.messageStatus = messageStatus;
    }
}
