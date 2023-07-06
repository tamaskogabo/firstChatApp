import React from 'react';

export default function MembersList(onSetTab, privateChats, tab) {
    return (
        <div className='member-list'>
            <ul>
                <li
                    onClick={() => onSetTab('CHATROOM')}
                    className={`member ${tab === 'CHATROOM' && 'active'}`}
                >
                    Chatroom
                </li>
                {[...privateChats.keys()].map((name, index) => {
                    return (
                        <li
                            key={index}
                            onClick={() => onSetTab(name)}
                            className={`member ${tab === name && 'active'}`}
                        >
                            {name}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
