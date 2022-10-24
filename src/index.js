const express = require('express');

const app = express();
const { PORT } = require('./constans');

require('./config/hbsConfig')(app);
require('./config/expressConfig')(app);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(PORT, () => console.log(`The app is listening on port ${PORT}`));