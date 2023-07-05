package com.codecool.firstchatapp.controller;

import com.codecool.firstchatapp.model.MessageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;

public class MessageController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @MessageMapping("/message") //app/message
    @SendTo("/chatroom/public")
    public MessageDTO receivePublicMessage(@Payload MessageDTO messageDTO) {
        return messageDTO;
    }

    @MessageMapping("/private-message")  //user/NAME/private
    public MessageDTO receivePrivateMessage(@Payload MessageDTO messageDTO) {
        simpMessagingTemplate.convertAndSendToUser(messageDTO.getTo(), "/private", messageDTO.getText());
        return messageDTO;
    }
}
