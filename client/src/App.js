import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import protobuf from 'protobufjs';
const { Buffer } = require('buffer/');

function App() {
  const [stonk, setStonk] = useState(null);

  const formatPriceByTwoDecimals = (price) => {
    return `$${price.toFixed(2)}`;
  }

  useEffect(() => {
    const ws = new WebSocket('wss://streamer.finance.yahoo.com');
    protobuf.load('./YPricingData.proto', (err, root) => {
        if(err) {
          return console.log(err);
        }

        const Yaticker = root.lookupType('yaticker');

        ws.onopen = function open() {
          console.log('connected');
          ws.send(JSON.stringify({
            subscribe: ['AMC']
          }));
        };
      
        ws.onclose = function close() {
          console.log('disconnected');
        };
      
        ws.onmessage = function incoming(message) {
          console.log('comming message')
          //console.log(data);
          const next = (Yaticker.decode(new Buffer(message.data, 'base64')));
          setStonk(next);
        }
    });
  }, []);

  return (
    <div className="App">
      {
        stonk && 
          <div>
          {formatPriceByTwoDecimals(stonk.price)}
          </div>
      }
    </div>
  );
}

export default App;
