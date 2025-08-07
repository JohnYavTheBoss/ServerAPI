const NotificationModel = require("../models/notification");
const PaiementModel = require("../models/payement");
const { v4: uuidv4 } = require("uuid");

const uid = uuidv4(); // Generates a UUID (v4)

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
  let {
    idEleve,
    eleve,
    frais,
    montant,
    currency,
    classe,
    anneScolaire,
    telephone,
  } = request.body;
  let contenu = `nouveau paiement pour le ${frais} par l'eleve ${eleve} vient d'etre effectue`;

  try {
      await PaiementModel.create({
        idEleve,
        eleve,
        frais,
        montant,
        currency,
        classe,
        anneScolaire,
        telephone,
      })
    .then(async (data) => {
      if (data) {
        await NotificationModel.create({
          contenu,
          recepteur: "comptable",
          motif: "nouveau paiement",
        }).then((data) => {
          return response.status(200).json(data);
        });
      }
    });
  } catch (error) {
    response.json({ error: error.message });
    console.log(error.message);
  }
};

module.exports.approuverPayement = async (request, response) => {

  try {
    PaiementModel.findByIdAndUpdate(
      { _id: request.params.idPayement },
      {
        $set: {
          approbation: request.body.approbation,
        },
      },
      { new: true, upsert: true }
    ).then((data) => {
      if (data) return response.status(200).json(data);
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports.rejeterPayement = async (request, response) => {
  try {
    PaiementModel.findByIdAndUpdate(
      { _id: request.params.idPayement },
      {
        $set: {
          approbation: request.body.approbation,
        },
      },
      { new: true, upsert: true }
    ).then((data) => {
      if (data) return response.status(200).json(data);
    });
  } catch (error) {
    console.log(error);
  }
};
