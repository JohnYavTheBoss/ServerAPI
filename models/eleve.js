const mongoose = require("mongoose");
const Schemas = mongoose.Schema;

var eleveSchemas = new Schemas({
    nom: {
        type: String,
        minLenght: 2,
        maxLehgtn: 15,
        required: true,
        trim: true
    },
    postnom: {
        type: String,
        minLenght: 2,
        maxLehgtn: 15,
        required: true,
        trim: true
    },
    prenom:  {
        type: String,
        minLenght: 2,
        maxLehgtn: 15,
        trim: true
    },
    idenfient: {
        type: String
    },
    age: {
        type: String
    },
    dateNaissaince: {
        type: String
    },
    adresseLocale: {
        type: String
    },
    telephone: {
        type: String
    },
    password: {
        type: String
    }
},{
    timestamps: true
})

var EleveModel = mongoose.model("eleve", eleveSchemas);
module.exports = EleveModel;