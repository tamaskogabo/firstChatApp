import React from 'react';

export default function PrivateChatRoom({privateChats, tab, userData}) {
    return (
        <ul className='chat-messages'>
            {[...privateChats.get(tab)].map((chat, index) => {
                return (
                    <li
                        key={index}
                        className={`message ${
                            chat.from === userData.from && 'self'
                        }`}
                    >
                        {chat.from !== userData.from && (
                            <div className='avatar'>{chat.from}</div>
                        )}
                        <div className='message-data'>{chat.text}</div>
                        {chat.from === userData.from && (
                            <div className='avatar-self'>{chat.from}</div>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
