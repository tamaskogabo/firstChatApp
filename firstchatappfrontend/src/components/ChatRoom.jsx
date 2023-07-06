import React from 'react';
import { useState } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

export default function ChatRoom() {
    const [userData, setUserData] = useState({
        username: '',
        receiverName: '',
        connected: false,
        message: '',
    });
    const [publicChats, setPublicChats] = useState([]);
    const [privateChats, setPrivateChats] = useState(new Map());
    const [tab, setTab] = useState('CHATROOM');

    function handleUserName(e) {
        setUserData({ ...userData, username: e.target.value });
    }

    function registerUser() {
        const sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(sock);
        stompClient.connect({}, onConnected, onConnectionError);
    }

    function onConnected() {
        setUserData({ ...userData, connected: true });
        stompClient.subscribe('/chatroom/public', onPublicMessageReceived);
        stompClient.subscribe(
            `/user/${userData.username}/private`,
            onPrivateMessageReceived,
        );
    }

    function onConnectionError(err) {
        setUserData({ ...userData, connected: false });
        console.error(err);
    }

    function onPublicMessageReceived(payload) {
        const incomingMessage = JSON.parse(payload.body);
        switch (incomingMessage.messageStatus) {
            case 'JOIN':
                if (!privateChats.get(incomingMessage.from)) {
                    privateChats.set(incomingMessage.from, []);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case 'MESSAGE':
                const currentState = [...publicChats];
                currentState.push(incomingMessage);
                setPublicChats(currentState);
                break;
            default:
                console.error(
                    'Something went wrong in receiving a public message.',
                );
        }
    }

    function onPrivateMessageReceived(payload) {
        const incomingMessage = JSON.parse(payload);
        if (privateChats.get(incomingMessage.from)) {
            privateChats.get(incomingMessage.from).push(incomingMessage);
            setPrivateChats(new Map(privateChats));
        } else {
            privateChats.set(incomingMessage.from, [incomingMessage]);
            setPrivateChats(new Map(privateChats));
        }
    }

    function handleMessage() {
        //TODO
    }

    function sendPublicMessage() {
        //TODO
    }

    return (
        <div className='container'>
            {userData.connected ? (
                <div className='chat-box'>
                    <div className='member-list'>
                        <ul>
                            <li
                                onClick={() => setTab('CHATROOM')}
                                className={`member ${
                                    tab === 'CHATROOM' && 'active'
                                }`}
                            >
                                Chatroom
                            </li>
                            {[...privateChats.keys()].map((name, index) => {
                                return (
                                    <li
                                        key={index}
                                        onClick={() => setTab(name)}
                                        className={`member ${
                                            tab === name && 'active'
                                        }`}
                                    >
                                        {name}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    {tab === 'CHATROOM' && (
                        <div className='chat-content'>
                            <ul className='chat-messages'>
                                {publicChats.map((chat, index) => {
                                    return (
                                        <li key={index} className='message'>
                                            {chat.from !==
                                                userData.username && (
                                                <div className='avatar'>
                                                    {chat.from}
                                                </div>
                                            )}
                                            <div className='message-data'>
                                                {chat.message}
                                            </div>
                                            {chat.from ===
                                                userData.username && (
                                                <div className='avatar-self'>
                                                    {chat.from}
                                                </div>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className='send-message'>
                                <input
                                    type='text'
                                    className='input-message'
                                    placeholder='Send message'
                                    value={userData.message}
                                    onChange={handleMessage}
                                />
                                <button
                                    type='button'
                                    className='send-button'
                                    onClick={sendPublicMessage}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    )}
                    {tab !== 'CHATROOM' && (
                        <div className='chat-content'>
                            {privateChats.get(tab).map((chat, index) => {
                                return (
                                    <li key={index} className='message'>
                                        {chat.from !== userData.username && (
                                            <div className='avatar'>
                                                {chat.from}
                                            </div>
                                        )}
                                        <div className='message-data'>
                                            {chat.message}
                                        </div>
                                        {chat.from === userData.username && (
                                            <div className='avatar-self'>
                                                {chat.from}
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </div>
                    )}
                </div>
            ) : (
                <div className='register'>
                    <input
                        id='user-name'
                        placeholder='Enter a user name'
                        value={userData.username}
                        onChange={handleUserName}
                    />
                    <button type='button' onClick={registerUser}>
                        Register
                    </button>
                </div>
            )}
        </div>
    );
}
