const mongoose = require("mongoose");
const Schemas = mongoose.Schema;

const fraisSchemas = new Schemas({
    designation: {
        type: String,
    },
    montant: {
        type: String,
        required: true
    },
    currency: String,
    anneScolaire: {
        type: String,
        required: true
    },
    catalogue: String,
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