const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const api = require('./routes/api');
const config = require('./config/config');
const log = require('./utils/log');

const app = express();

process.on('uncaughtException', err => log.err(err));
process.on('unhandledRejection', err => log.err(err));
app.use(require('cors')());
app.use(express.json());
app.use(cookieParser());
app.use('/api', api);
if (config.PROD) {
    app.use(express.static(require('path').resolve(__dirname + '/../client/build')));
    app.use('/*', (req, res) =>
        res.sendFile(
            require('path').resolve(__dirname + '/../client/build/index.html')
        )
    );
}
app.listen(config.PORT, err => {
    if (log.err(err)) return;
    log.log('Listening to port ' + config.PORT + '...');
});

mongoose.connect(
    config.DATABASE,
    { useNewUrlParser: true, useCreateIndex: true },
    err => {
        if (log.err(err)) return;
        log.log('Connected to MongoDB!');
    }
);
