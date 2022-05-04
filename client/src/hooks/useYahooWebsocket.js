import React from 'react'
import { useEffect, useState } from 'react';
import protobuf from 'protobufjs';
const { Buffer } = require('buffer/');

const useYahooWebsocket = (props) => {
    const [stonk, setStonk] = useState(null);
  //  console.log(props)

    useEffect(() => {
        const ws = new WebSocket('wss://streamer.finance.yahoo.com');
        protobuf.load('../YPricingData.proto', (err, root) => {
            if(err) {
              return console.log(err);
            }
    
            const Yaticker = root.lookupType('yaticker');
    
            ws.onopen = function open() {
              console.log('connected');
              ws.send(JSON.stringify({
                subscribe: [props]
              }));
            };
          
            ws.onclose = function close() {
              console.log('disconnected');
            };
          
            ws.onmessage = function incoming(message) {
              const next = (Yaticker.decode(new Buffer(message.data, 'base64')));
              setStonk(next);
            //  console.log(next);
            }
        });
      }, []);
    


    return stonk;
}

export default useYahooWebsocket