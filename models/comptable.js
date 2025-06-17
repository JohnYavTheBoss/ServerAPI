const mongoose = require("mongoose");
const Schemas = mongoose.Schema;

const ComptableSchemas = new Schemas({
    matricule: {
        type: String,
        required: false
    },
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
    prenom: {
        type: String,
        minLenght: 2,
        maxLehgtn: 15,
        required: true,
        trim: true
    },
    telephone: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: false,
        trim: true
    }
}, {
    timestamps: true
});

const ComptableModel = mongoose.model("comptable", ComptableSchemas);
module.exports = ComptableModel;