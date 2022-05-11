const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
var yahooFinance = require('yahoo-finance');
const { default:axios } = require("axios");
const cheerio = require('cheerio');

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

app.get('/news', async (req, res) => {
    try{
        const siteURL = 'https://www.marketwatch.com/latest-news?mod=top_nav';
        const { data } = await axios({
            method: "GET",
            url: siteURL
        });
    
        const $ = cheerio.load(data);
        const elemSelector = '#maincontent > div:nth-child(1) > div.region.region--primary > div.component.component--module.more-headlines > div > div.collection__elements.j-scrollElement > div';
       
        const news = [];


        $(elemSelector).each((parentIndex, parentElem) => {
            const newsObj = {};


            const articleHeader = $(parentElem).find('h3 a').text().replace(/\s\s+/g, ' ');
            const link = $(parentElem).find('h3 a').attr('href');
            const img = $(parentElem).find('figure img', parentElem).attr('data-srcset');

            newsObj.articleHeader = articleHeader;
            newsObj.link = link;
            newsObj.img = img === undefined ? "none" : img;
        

            news.push(newsObj);
        });
 

        res.send({news: news});
    } catch (err) {
        console.log(err);
    }
});


server.listen(process.env.PORT || 5000, () => {
    console.log("SERVER RUNNING ON PORT 5000");
});