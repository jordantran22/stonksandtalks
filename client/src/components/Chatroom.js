import React from 'react'
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

const socket = io.connect(process.env.React_App_SERVER_URL);

const Chatroom = ({ticker}) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [userConnectionToRoom, setUserConnectionToRoom] = useState(false);
  const randomColors = ["redColor", "greenColor", "blueColor", "purpleColor"];
  const [userAuthorColor, setUserAuthorColor] = useState("");

  const randomAuthorNameColor = () => {
    // e.preventDefault();
    //setUserAuthorColor(randomColors[Math.floor(Math.random()*randomColors.length)]);
    console.log("color being called")
    return(randomColors[Math.floor(Math.random()*randomColors.length)]);
  }

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
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
        color: randomAuthorNameColor()
      };

      await socket.emit("send_message", messageData);
      setMessageList((messageList) => [...messageList, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    if(!userConnectionToRoom) {
      joinRoom();
      //randomAuthorNameColor();
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

        <div>
          <ScrollToBottom className='messageContainer'>
            <div className='welcomeMessage'>Welcome to chat room!</div>
            {
              messageList.map((message) => {
                return (
                  <div className='userMessage'>
                    <div className={message.color}>{message.author}: </div>
                    <div className='messageContent'>{message.message}</div>
                    <div className='messageTime'>{message.time}</div>
                  </div>
                )
              })
            }
          </ScrollToBottom>
        </div>

        <div className='sendMessageContainer'>
            <input type="text" className='chatbar' value={currentMessage} onChange={(event) => {
              setCurrentMessage(event.target.value);
            }} onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}/>
            <button className='chatButton' onClick={() => sendMessage()}>Chat</button>
        </div>

    </div>
  )
}

export default Chatroom