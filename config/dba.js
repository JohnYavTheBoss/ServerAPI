const mongoose = require("mongoose");
const DB_CONNEXION_STRING_LOCALHOST = 'mongodb://localhost:27017/payementFrais';
const DB_CONNEXION_STRING_CLUSTER = 'mongodb+srv://johnyav19:john19@cluster0.ddunn7v.mongodb.net/payementFrais';

try {
    mongoose.connect(DB_CONNEXION_STRING_CLUSTER).then(()=> {
        console.log("connexion à mongodb ATLAS etablie avec succes");
    })
} catch (error) {
    console.log("erreur de la connexion "+" ", error);
}