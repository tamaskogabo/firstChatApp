import React from 'react';

export default function SendPrivateMessage({userData, onHandleMessage, onSendPrivateMessage}) {
    return (
        <div className='send-message'>
            <input
                type='text'
                className='input-message'
                placeholder='Send message'
                value={userData.text}
                onChange={onHandleMessage}
            />
            <button
                type='submit'
                className='send-button'
                onClick={onSendPrivateMessage}
            >
                Send
            </button>
        </div>
    );
}
