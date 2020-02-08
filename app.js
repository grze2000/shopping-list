const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('test');
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(`Listening on ${port}`);
});