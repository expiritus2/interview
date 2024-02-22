const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
require('express-async-errors');
const errorHandler = require('./middlewares/error-handler');
const allApiV1Routes = require('./routes/v1');

dotenv.config({ path: `${__dirname}/.env`});

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

allApiV1Routes('/api/v1', app);

app.all('*', async () => {
    console.log('Route not found!');
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
})
