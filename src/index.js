const express = require('express');

const app = express();

const routes = require('./routes');
const { PORT } = require('./constans');

require('./config/hbsConfig')(app);
require('./config/expressConfig')(app);


app.use(routes);

app.listen(PORT, () => console.log(`The app is listening on port http://localhost:${PORT}`));