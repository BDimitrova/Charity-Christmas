const express = require('express');

const app = express();

const routes = require('./routes');
const { PORT } = require('./constants');
const initDatabase = require('./config/mongooseConfig');

require('./config/hbsConfig')(app);
require('./config/expressConfig')(app);


app.use(routes);

initDatabase()
    .then(() => {
        app.listen(PORT, () => console.log(`The app is listening on port http://localhost:${PORT}`));
    })
    .catch((err) => {
        console.log('Connot connect database:' + err);
    })
