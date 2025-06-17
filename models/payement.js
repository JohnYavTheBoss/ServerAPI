const mongoose = require("mongoose");
const Schemas = mongoose.Schema;

var paiementSchemas = new Schemas({
    numero: {
        type: String
    },
    idEleve: {
        type: String
    },
    eleve: {
        type: String
    },
    idFrais: {
        type: String
    },
    frais: {
        type: String
    },
    montant: {
        type: String
    },
    anneScolaire: {
        type: String
    },
    datePaiement: {
        type: Date,
        default: new Date().getDate()
    },
    statut: [
        'payé',
        'non payé'
    ],
    approbation: [
        'apprové',
        'non approuvé'
    ]
},{
    timestamps: true
})

const PaiementModel = mongoose.model("Paiement", paiementSchemas);
module.exports = PaiementModel;