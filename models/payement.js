const mongoose = require("mongoose");
const Schemas = mongoose.Schema;

const paiementSchemas = new Schemas({
   numero: {
        type: String
    },
    idEleve: {
        type: String
    },
    eleve: {
        type: String
    },
    classe: String,
    idFrais: {
        type: String
    },
    frais: {
        type: String
    },
    montant: {
        type: String
    },
    currency: String,
    telephone: String,
    anneScolaire: {
        type: String
    },
    datePaiement: {
        type: Date,
        default: new Date().getDate()
    },
    statut: {
        type: String,
        default: "Payé",
        enums: ["Payé", "En attente", "Annulé", "Nom Payé"]
    },
    
    approbation: {
        type: String,
        default: "En attente d'approbation",
        enums: ["En attente d'approbation", "Approuvé", "Non approuvé", "Rejet"]
    }
},{
    timestamps: true
});

const PaiementModel = mongoose.model("paiement", paiementSchemas);
module.exports = PaiementModel;