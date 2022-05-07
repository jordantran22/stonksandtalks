import React from 'react'
import io from 'socket.io-client';
import { useEffect } from 'react';

const socket = io.connect(process.env.React_App_SERVER_URL);

const Chatroom = ({ticker}) => {

  const joinRoom = () => {
    socket.emit("join_room", ticker.stockTicker);
  }


  useEffect(() => {
    joinRoom();
  }, []);


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