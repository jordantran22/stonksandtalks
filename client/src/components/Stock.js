import React from 'react'
import { useEffect, useState } from 'react';
import protobuf from 'protobufjs';
import LineChart from './LineChart';
import {
    useParams
  } from "react-router-dom";
import SideNavbar from './SideNavbar';

const { Buffer } = require('buffer/');

const Stock = () => {
    const [stonk, setStonk] = useState(null);
    const ticker = useParams();


    const formatPriceByTwoDecimals = (price) => {
      return `${price.toFixed(2)}`;
    }
  
   
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
            subscribe: [`${ticker.stockTicker}`]
          }));
        };
      
        ws.onclose = function close() {
          console.log('disconnected');
        };
      
        ws.onmessage = function incoming(message) {
          const next = (Yaticker.decode(new Buffer(message.data, 'base64')));
          setStonk(next);
          console.log(next);
        }
    });
  }, []);

    return (
        <div className='stockPageContainer'>
          <SideNavbar />
            {
                stonk && 
                <div>
                  {formatPriceByTwoDecimals(stonk.price)}
                  <LineChart stockPrice={formatPriceByTwoDecimals(stonk.price)} />  
                </div>
            }

            
        </div>
    )
}

export default Stock