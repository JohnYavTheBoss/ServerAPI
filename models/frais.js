const mongoose = require("mongoose");
const Schemas = mongoose.Schema;

const fraisSchemas = new Schemas({
    designation: {
        type: String,
        required: true,
    },
    montant: {
        type: String,
        required: true
    },
    anneScolaire: {
        type: String,
        required: true
    },
    dateAjout: {
        type: Date,
        default: new Date().getFullYear()
    },
    statut: [
        'suprimé',
        'modifié',
        'ajouté'
    ],
},{
    timestamps: true
})

const FraisModel = mongoose.model("frais", fraisSchemas);
module.exports = FraisModel;