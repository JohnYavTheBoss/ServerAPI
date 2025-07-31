const NotificationModel = require("../models/notification");
const PaiementModel = require("../models/payement");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const uid = uuidv4(); // Generates a UUID (v4)

const TRANSACTION_ID = uid;
const CINETPAY_API_KEY = "12228706686864cee2444463.99011606";
const CINETPAY_SITE_ID = "105900531";
const CINETPAY_BASE_URL = "https://api-checkout.cinetpay.com/v2/payment";

module.exports.getPayement = async (request, response) => {
  try {
    await PaiementModel.findOne({ _id: request.params.id }).then((data) => {
      if (data) return response.status(200).json(data);
      else
        return responese
          .status(400)
          .json({ erreurMessage: "aucune donnee trouvee" });
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports.getAllPayement = async (request, response) => {
    try {
    await PaiementModel.find()
      .sort({ createdAt: -1 })
      .then((data) => {
        if (data) return response.status(200).json(data);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports.addPayement = async (request, response) => {
  let { idEleve, eleve, frais, montant, currency, classe, anneScolaire, telephone,  } =
    request.body;
  let contenu = `nouveau paiement pour le frais ${frais} par l'eleve ${eleve} vient d'etre effectue`;


  try {
    (await PaiementModel.create({
      idEleve,
      eleve,
      frais,
      montant,
      currency,
      classe,
      anneScolaire,
      telephone,

    })).then(async (data) => {
      if (data){
        await NotificationModel.create({
          contenu,
          recepteur: "comptable",
          motif: "nouveau paiement",
        }).then((data) => {
          return response.status(200).json(data);
        })
      }
    })
   
  } catch (error) {
    response.json({ error: error.message });
    console.log(error.message);
  }
};
