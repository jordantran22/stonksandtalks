import React from 'react'

const Chatroom = () => {
  return (
    <div className='chatRoomContainer'>
       
        <div className='chatRoomHeader'>
            <h2>Chat Room</h2>
        </div>

        <div className='messageContainer'>
            <div className='welcomeMessage'>Welcome to chat room!</div>
        </div>

        <div className='sendMessageContainer'>
            <input type="text" className='chatbar'/>
            <button className='chatButton'>Chat</button>
        </div>

    </div>
  )
}

export default Chatroom