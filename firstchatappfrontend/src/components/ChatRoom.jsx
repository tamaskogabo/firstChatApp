import React from 'react';
import { useState } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import SendPublicMessage from './SendPublicMessage';
import PublicChatRoom from './PublicChatRoom';
import SendPrivateMessage from './SendPrivateMessage';
import RegisterPage from './RegisterPage';
import PrivateChatRoom from './PrivateChatRoom';

let stompClient = null;

export default function ChatRoom() {
    const [userData, setUserData] = useState({
        from: '',
        to: '',
        connected: false,
        text: '',
    });
    const [publicChats, setPublicChats] = useState([]);
    const [privateChats, setPrivateChats] = useState(new Map());
    const [tab, setTab] = useState('CHATROOM');

    function handleUserName(e) {
        setUserData({ ...userData, from: e.target.value });
    }

    function connect() {
        const sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(sock);
        stompClient.connect({}, onConnected, onConnectionError);
    }

    function onConnected() {
        setUserData({ ...userData, connected: true });
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe(
            `/user/${userData.from}/private`,
            onPrivateMessageReceived,
        );
        userJoin();
    }

    function userJoin() {
        if (stompClient) {
            const outgoingMessage = {
                from: userData.from,
                messageStatus: 'JOIN',
            };
            stompClient.send(
                '/app/message',
                {},
                JSON.stringify(outgoingMessage),
            );
        }
    }

    function onConnectionError(err) {
        console.error(err);
    }

    function onMessageReceived(payload) {
        const incomingMessage = JSON.parse(payload.body);
        // eslint-disable-next-line default-case
        switch (incomingMessage.messageStatus) {
            case 'JOIN':
                if (!privateChats.get(incomingMessage.from)) {
                    privateChats.set(incomingMessage.from, []);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case 'MESSAGE':
                publicChats.push(incomingMessage);
                setPublicChats([...publicChats]);
                break;
        }
    }

    function onPrivateMessageReceived(payload) {
        const incomingMessage = JSON.parse(payload.body);
        if (privateChats.get(incomingMessage.from)) {
            privateChats.get(incomingMessage.from).push(incomingMessage);
            setPrivateChats(new Map(privateChats));
        } else {
            const list = [];
            list.push(incomingMessage);
            privateChats.set(incomingMessage.from, list);
            setPrivateChats(new Map(privateChats));
        }
    }

    function handleMessage(e) {
        setUserData({ ...userData, text: e.target.value });
    }

    function sendPublicMessage() {
        if (stompClient) {
            const outgoingMessage = {
                from: userData.from,
                text: userData.text,
                messageStatus: 'MESSAGE',
            };
            console.log(outgoingMessage);
            stompClient.send(
                '/app/message',
                {},
                JSON.stringify(outgoingMessage),
            );
            setUserData({ ...userData, text: '' });
        }
    }

    function sendPrivateMessage() {
        if (stompClient) {
            const outgoingMessage = {
                from: userData.from,
                text: userData.text,
                to: tab,
                messageStatus: 'MESSAGE',
            };
            if (userData.from !== tab) {
                privateChats.get(tab).push(outgoingMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send(
                '/app/private-message',
                {},
                JSON.stringify(outgoingMessage),
            );
            setUserData({ ...userData, text: '' });
        }
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
                            <PublicChatRoom
                                publicChats={publicChats}
                                userData={userData}
                            />
                            <SendPublicMessage
                                userData={userData}
                                onHandleMessage={handleMessage}
                                onSendPublicMessage={sendPublicMessage}
                            />
                        </div>
                    )}
                    {tab !== 'CHATROOM' && (
                        <div className='chat-content'>
                            <PrivateChatRoom
                                userData={userData}
                                tab={tab}
                                privateChats={privateChats}
                            />
                            <SendPrivateMessage
                                userData={userData}
                                onHandleMessage={handleMessage}
                                onSendPrivateMessage={sendPrivateMessage}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <RegisterPage
                    userData={userData}
                    onHandleUserName={handleUserName}
                    onConnect={connect}
                />
            )}
        </div>
    );
}
