import React from 'react';

export default function SendPublicMessage({userData, onHandleMessage, onSendPublicMessage}) {
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
                onClick={onSendPublicMessage}
            >
                Send
            </button>
        </div>
    );
}
