import React from 'react';
import { useState } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';

export default function ChatRoom() {
    const [userData, setUserData] = useState({
        username: '',
        receiverName: '',
        connected: false,
        message: '',
    });

    function handleUserName(e) {
        setUserData({ ...userData, username: e.target.value });
    }

    function registerUser() {

    }

    return (
        <div className='container'>
            {userData.connected ? (
                <div></div>
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
