import React from 'react'
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io.connect(process.env.React_App_SERVER_URL);

const Chatroom = ({ticker}) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [userConnectionToRoom, setUserConnectionToRoom] = useState(false);

  const joinRoom = () => {
    socket.emit("join_room", ticker.stockTicker);
    setUserConnectionToRoom(true);
  }

  const sendMessage = async () => {
    if (currentMessage !== "") {
      console.log("sent message to server");
      const messageData = {
        room: ticker.stockTicker,
        author: "gigachad",
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      };

      await socket.emit("send_message", messageData);
      setMessageList((messageList) => [...messageList, messageData]);
    }
  };

  useEffect(() => {
    if(!userConnectionToRoom) {
      joinRoom();
    }

    socket.on("receive_message", (data) => {
      console.log(data);
      setMessageList((messageList) => [...messageList, data]);
      console.log(messageList)
    });
  }, [socket]);

  return (
    <div className='chatRoomContainer'>
       
        <div className='chatRoomHeader'>
            <h2>Chat Room</h2>
        </div>

        <div className='messageContainer'>
            <div className='welcomeMessage'>Welcome to chat room!</div>
            {
              messageList.map((message) => {
                return (
                  <div>
                    <div>{message.author}: </div>
                    <div>{message.message}</div>
                    <div>{message.time}</div>
                  </div>
                )
              })
            }
        </div>

        <div className='sendMessageContainer'>
            <input type="text" className='chatbar' onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}/>
            <button className='chatButton' onClick={() => sendMessage()}>Chat</button>
        </div>

    </div>
  )
}

export default Chatroom