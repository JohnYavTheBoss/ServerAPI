const  NotificationModel = require("../models/notification");
const PaiementModel = require("../models/payement");


module.exports.getPayement = async (request, response) => {
    try {
        (await PaiementModel.findOne({_id: request.params.id}).then((data) =>{
            if(data) return response.status(200).json(data);
            else return responese.status(400).json({erreurMessage: 'aucune donnee trouvee'})
        }))
    } catch (error) {
        console.error(error);
    }
}

module.exports.getAllPayement = async (request, response) => {
    try {
        (await PaiementModel.find().then((data) => {
            if(data) return response.status(200).json(data);
            else return responese.status(400).json({erreurMessage: 'aucune donnee trouvee'})
        }))
    } catch (error) {
        console.error(error);
        
    }
}

module.exports.addPayement = async (request, response) => {
let {idEleve,eleve, frais, montant, anneScolaire} = request.body;
let contenu = `nouveau paiement pour le frais ${frais} par l'eleve ${eleve} vient d'etre effectue`
    try {
        (await PaiementModel.create({
            idEleve: idEleve,
            eleve: eleve,
            montant: montant,
            frais: frais,
            anneScolaire: anneScolaire,
            statut: 'payé',
            approbation: 'non approuvé'
        }).then(async (data) => {
            if(data){
                (await NotificationModel.create({
                    contenu: contenu,
                    recepteur: 'comptable',
                    motif: 'paiement'
                }).then((data) =>{
                    if(data) return response.status(200).json(data);
                    else response.status(400).json({erreurMessage: 'notification non envoyee'})
                }))

            }else return response.status(400).json({erreurMessage: "quelque choce s'est mal passee, veuillez reessayer"});
        }))
    } catch (error) {
        console.error(error);
    }
}