const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
var yahooFinance = require('yahoo-finance');

app.use(cors());


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(socket.id);

    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with id: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        console.log(data);
        socket.to(data.room).emit("receive_message", data);
        console.log("sent message back");
    });

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    });
});

app.get('/stock/:stockTicker/price', (req, res) => {
    var SYMBOL = req.params.stockTicker;
    var currentDate = new Date(Date.now());
    var oneYearAgoDate = (currentDate.getFullYear() - 1) + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
    var recentPrice= {};

    yahooFinance.quote({
        symbol: `${SYMBOL}`,
        modules: ['price']       // optional; default modules.
      }, function(err, quote) {
          if(err) {
              console.log(err);
              return;
          }
          //console.log(quote);
          recentPrice = quote;

         // res.send({currentPriceData: quote});

         yahooFinance.historical({
            symbol: SYMBOL,
            from: oneYearAgoDate,
            to: currentDate.toJSON().substring(0,10),
            period: 'd'
            }, function (err, quotes) {
            if (err) { throw err; } 
            else {
               // console.log(quotes);
                var historicDates = [];
                var historicPrices = [];
                
                quotes.map((quote) => {
                    historicDates.push(quote.date.toJSON().substring(0,10));
                    historicPrices.push(quote.close);
                })
    
                res.send({stockInfo: {
                            recentPrice,
                            historicData: {
                                prices: historicPrices.reverse(),
                                dates: historicDates.reverse()
                            }
                        }});
            }
        })
      });
});


server.listen(process.env.PORT || 5000, () => {
    console.log("SERVER RUNNING ON PORT 5000");
});