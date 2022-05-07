const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
var yahooFinance = require('yahoo-finance');
 var util = require('util');

// require('colors');
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

app.get('/historic/price/:ticker', (req, res) => {
    console.log("testing endpoint");
    console.log(req.params.ticker);


    var SYMBOL = req.params.ticker;

    yahooFinance.historical({
    symbol: SYMBOL,
    from: '2021-01-01',
    to: '2022-5-7',
    period: 'd'
    }, function (err, quotes) {
    if (err) { throw err; } 
    else {
        console.log(quotes);
        res.send({historicData: quotes});
    }
    // console.log(util.format(
    //     '=== %s (%d) ===',
    //     SYMBOL,
    //     quotes.length
    // ).cyan);
    // if (quotes[0]) {
    //     console.log(
    //     '%s\n...\n%s',
    //     JSON.stringify(quotes[0], null, 2),
    //     JSON.stringify(quotes[quotes.length - 1], null, 2)
    //     );
    // } else {
    //     console.log('N/A');
    // }
    })
})


server.listen(process.env.PORT || 5000, () => {
    console.log("SERVER RUNNING ON PORT 5000");
});