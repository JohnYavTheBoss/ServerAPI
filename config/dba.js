const mongoose = require("mongoose");


try {
    mongoose.connect(`mongodb+srv://johnyav19:john19@cluster0.ddunn7v.mongodb.net/payementFrais`).then(()=> {
        console.log("connexion à mongodb ATLAS etablie avec succes");
    })
} catch (error) {
    console.log("erreur de la connexion "+" ", error);
}