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

app.post('/messages', async (req, res) => {

    try {
        throw 'error'
        // Gets message from text file
        var message = new Message(req.body)

        // Save the message in the database
        var savedMessage = await message.save()

        console.log('Saved.')

        var censored = await Message.findOne({ message: 'badword' })
        // Checks to see if a message needs to be censored
        if(censored) {
            console.log('Message censored.')
            await Message.deleteOne({ _id: censored.id })
        }
        // Otherwise, it shows the message
        else
            io.emit('message', req.body)
        res.sendStatus(200)

    } catch (error) {
        res.sendStatus(500)
        return console.error(error)
    } finally {
        // Some possible uses for finally block
        // logger.log('Message post called')
        // console.log('Message post called.')
    }

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
