const express = require("express");
require("./config/dba");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require('cors');

const PORT = 5001;
const authRoute = require("./routes/authentification");
const fraisRoute = require("./routes/frais");
const { checkEleve, requireAuth } = require("./middlewares/authMiddleware");
const eleveRoute = require('./routes/eleve');
const paiementRoute = require('./routes/payement');
const notificationRoute = require('./routes/notification');





const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());


//JWT
app.get('*', checkEleve);
app.get('/jwtid', requireAuth, (request, response) => {
    response.status(200).send(response.locals.eleve._id);
})

//routes
app.use('/api/v1', authRoute);
app.use('/api/v1', fraisRoute);
app.use('/api/v1', eleveRoute);
app.use('/api/v1', paiementRoute);
app.use('/api/v1', notificationRoute)


app.listen(PORT, () => {
    console.log(`le serveur est lancé au port`+ ` `+ `${PORT}`);
});