var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

mongoose.Promise = Promise;

var dbUrl = 'mongodb+srv://user:user@tmurray19cluster-omzhu.mongodb.net/test?retryWrites=true'

var Message = mongoose.model('Message', {
    name: String,
    message: String
})

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages)
    })
});

app.post('/messages', (req, res) => {
    // console.log(req.body)

    // Gets message from text file
    var message = new Message(req.body)

    // Save the message in the database
    message.save()
    .then(() => {
        console.log('Saved.')
        return Message.findOne({message: 'badword'})
    })
    // Checks to see if a message needs to be censored
    .then( censored => {
        if(censored) {
            console.log('Censored word found: ', censored)
            return Message.remove({_id: censored.id})
        }
        // Otherwise, it shows the message
        io.emit('message', req.body)
        res.sendStatus(200)
    })
    // For catching errors
    .catch((err) => {
        res.sendStatus(500)
        return console.error(err)
    })

});

io.on('connection', (socket) => {
    console.log('A user connected.')
});

mongoose.connect(dbUrl, { useNewUrlParser: true }, (err) => {
    console.log('MongoDB connection', err)
})

var server = http.listen(3000, () =>  {
    console.log("Server is listening on port", server.address().port)
});
