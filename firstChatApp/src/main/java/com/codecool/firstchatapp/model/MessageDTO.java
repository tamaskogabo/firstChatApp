package com.codecool.firstchatapp.model;

public class MessageDTO {
    private String from;
    private String text;
    private String to;

    public MessageDTO(String from, String text, String to) {
        this.from = from;
        this.text = text;
        this.to = to;
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
}
