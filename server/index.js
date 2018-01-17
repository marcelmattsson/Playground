const express = require('express');

const app = express();
const path = require('path');
const volleyball = require('volleyball');

app.use(volleyball);
// serve up static files
app.use(express.static(path.resolve(__dirname, '..', 'src')));
app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));
app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

// handle every other route with index.html, which will contain
// a script tag to our application's JavaScript file(s).
app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, '..', 'src', 'index.html'));
});
// listen on port 3000
app.listen(process.env.PORT || 8001, () => {
    console.log("Rockin' out on port 8001 homie");
});
