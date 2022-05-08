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
    const [historicPrices, setHistoricPrices] = useState([]);
    const [historicDates, setHistoricDates] = useState([]);
    const [recentStockPriceInfo, setRecentStockPriceInfo] = useState([]);
    const ticker = useParams();


    const formatPriceByTwoDecimals = (price) => {
      return `$${price.toFixed(2)}`;
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

    const getRecentStockPriceInformation = async () => {
      const requestInfo = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
      }

      const res = await fetch(`${process.env.React_App_SERVER_URL}/stock/${ticker.stockTicker}/price`, requestInfo);
      const data = await res.json();
      setRecentStockPriceInfo(data.currentPriceData.price);

      console.log(data);
    }
   
  useEffect(() => {
    getStockHistoricPriceInformation();
    getRecentStockPriceInformation()
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
                  {
                    historicDates.length === 0 && historicPrices.length === 0 ?
                    <img className='loadingGIF' src="https://flevix.com/wp-content/uploads/2019/07/Curve-Loading.gif" />
                    :
                    <div>
                      <div className='stockPageHeader'>
                        <h1 className='ticker'>{ticker.stockTicker}</h1>
                        {stonk !== null ? 
                          <h1>{formatPriceByTwoDecimals(stonk.price)}</h1> 
                          : 
                          <h1>{formatPriceByTwoDecimals(recentStockPriceInfo.regularMarketPrice)}</h1>}
                      </div>

                      <LineChart historicPrices={historicPrices} 
                      historicDates={historicDates} 
                      setHistoricPrices={setHistoricPrices} 
                      setHistoricDates={setHistoricDates} 
                      stockPrice={stonk !== null ? formatPriceByTwoDecimals(stonk.price) : stonk}
                      ticker={ticker.stockTicker}  />  
                    </div>
                  }
                </div>


          <Chatroom ticker={ticker}/>
        </div>
    )
}

export default Stock