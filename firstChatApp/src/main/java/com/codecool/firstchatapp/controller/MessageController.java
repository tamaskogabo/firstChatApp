package com.codecool.firstchatapp.controller;

import com.codecool.firstchatapp.model.MessageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    public MessageController(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @MessageMapping("/message") //app/message
    @SendTo("/chatroom/public")
    public MessageDTO receivePublicMessage(@Payload MessageDTO messageDTO) {
        return messageDTO;
    }

    @MessageMapping("/private-message")  //user/NAME/private
    public MessageDTO receivePrivateMessage(@Payload MessageDTO messageDTO) {
        simpMessagingTemplate.convertAndSendToUser(messageDTO.getTo(), "/private", messageDTO);
        return messageDTO;
    }
}
