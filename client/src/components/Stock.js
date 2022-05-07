import React from 'react'
import { useEffect, useState } from 'react';
import protobuf from 'protobufjs';
import LineChart from './LineChart';
import {
    useParams
  } from "react-router-dom";
import SideNavbar from './SideNavbar';
import Chatroom from './Chatroom';

const { Buffer } = require('buffer/');

const Stock = () => {
    const [stonk, setStonk] = useState(null);
    const [stockHistoricData, setStockHistoricData] = useState([]);
    const [historicPrices, setHistoricPrices] = useState([]);
    const [historicDates, setHistoricDates] = useState([]);
    const ticker = useParams();


    const formatPriceByTwoDecimals = (price) => {
      return `${price.toFixed(2)}`;
    }

    const getStockHistoricPriceInformation = async () => {
      const requestInfo = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
      }

      const res = await fetch(`${process.env.React_App_SERVER_URL}/historic/price/${ticker.stockTicker}`, requestInfo);
      const data = await res.json();
      console.log(data);
      setHistoricDates(data.historicData.dates);
      setHistoricPrices(data.historicData.prices);
    }
   
  useEffect(() => {
    getStockHistoricPriceInformation();
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
                <div className='lineChart'>
                  {/* {formatPriceByTwoDecimals(stonk.price)} */}
                  <LineChart historicPrices={historicPrices} 
                             historicDates={historicDates} 
                             setHistoricPrices={setHistoricPrices} 
                             setHistoricDates={setHistoricDates} 
                             stockPrice={stonk !== null ? formatPriceByTwoDecimals(stonk.price) : stonk}
                             ticker={ticker.stockTicker}  />  
                </div>


          <Chatroom ticker={ticker}/>
        </div>
    )
}

export default Stock