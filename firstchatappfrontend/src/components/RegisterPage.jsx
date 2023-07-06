import React from 'react';

export default function RegisterPage({userData, onHandleUserName, onConnect}) {
    return (
        <div className='register'>
            <input
                id='user-name'
                placeholder='Enter a user name'
                name='userName'
                value={userData.from}
                onChange={onHandleUserName}
            />
            <button type='submit' onClick={onConnect}>
                Register
            </button>
        </div>
    );
}
