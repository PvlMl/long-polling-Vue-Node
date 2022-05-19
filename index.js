const events = require('events');
const express = require('express');
const cors = require('cors');

const emitter = new events.EventEmitter();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/get', (req, res) => {
    emitter.once('newMessage', (mess) => {
        res.json(mess);
    })
});

app.post('/send', (req, res) => {
    emitter.emit('newMessage', req.body);
    res.status(200);
    res.json(req.body);
})

app.listen(3000, () => console.log('server started'));

