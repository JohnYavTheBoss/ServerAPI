const res = require("express/lib/response");
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
    mois,
    tranches,
    classeDetermined,
    currency,
    classe,
    anneScolaire,
    telephone,
  } = request.body;
  let contenu = `nouveau paiement pour le ${frais} par l'eleve ${eleve} vient d'etre effectué`;
  if (mois === "" || mois === undefined || mois === null) {
    if (tranches === null || tranches === "" || tranches === undefined) {
      try {
        await PaiementModel.create({
          idEleve: idEleve,
          eleve: eleve,
          frais: frais,
          montant: montant,
          currency: currency,
          classe: classe,
          anneScolaire: anneScolaire,
          telephone: telephone,
        }).then(async (data) => {
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
    } else {
      await PaiementModel.findOne({ tranche: tranches }).then(async (data) => {
        if (data) {
          return response
            .status(402)
            .send(
              "Le frais existe déjà: vous ne pouvez payer ce frais qu'une seule fois par tranche"
            );
        } else {
          return await PaiementModel.create({
            idEleve: idEleve,
            eleve: eleve,
            frais: frais,
            montant: montant,
            currency: currency,
            classe: classe,
            anneScolaire: anneScolaire,
            tranche: tranches,
            telephone: telephone,
          }).then(async (data) => {
            if (data) {
              await NotificationModel.create({
                recepteur: "comptable",
                motif: "nouveau paiement",
                contenu: `nouveau paiement pour le ${frais} ${tranches} par l'eleve ${eleve} vient d'etre effectué`,
              }).then((data) => {
                return response.status(200).json(data);
              });
            }
          });
        }
      });
    }
  } else {
    await PaiementModel.findOne({ mois: mois }).then(async (data) => {
      if (data) {
        return response
          .status(400)
          .send(
            "Le frais existe déjà: vous ne pouvez payer ce frais mensuel qu'une seule fois par mois"
          );
      } else {
        return await PaiementModel.create({
          idEleve: idEleve,
          eleve: eleve,
          frais: frais,
          montant: montant,
          currency: currency,
          classe: classe,
          anneScolaire: anneScolaire,
          mois: mois,
          telephone: telephone,
        }).then(async (data) => {
          if (data) {
            await NotificationModel.create({
              recepteur: "comptable",
              motif: "nouveau paiement",
              contenu: `nouveau paiement pour le ${frais} du mois de ${mois} par l'eleve ${eleve} vient d'etre effectué`,
            }).then((data) => {
              return response.status(200).json(data);
            });
          } else
            response
              .status(401)
              .send(
                "Echec d'enregistrement de votre paiement veuillez verifier bien vos informations et reessayer!"
              );
        });
      }
    });
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
