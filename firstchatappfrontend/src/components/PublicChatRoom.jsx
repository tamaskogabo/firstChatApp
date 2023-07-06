import React from 'react';

export default function PublicChatRoom({publicChats, userData}) {
    return (
        <ul className='chat-messages'>
            {publicChats.map((chat, index) => {
                return (
                    <li key={index} className='message'>
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
