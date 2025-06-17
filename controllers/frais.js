const FraisModel = require("../models/frais");
const NotificationModel = require("../models/notification");
const ObjectId = require("mongoose").Types.ObjectId;


module.exports.getAllfrais = async (request, response) => {
    try {
        (await FraisModel.find({$and: [{statut: "ajouté"}, {statut: "modifié"}]}).select().sort({ createdAt: -1 }).then((data) => {
            if (data) return response.status(200).json(data);
            else return response.status(400).json({message: "Aucun Frais Trouvé"});
        }))
    } catch (error) {
        console.log(error);
    }
}
module.exports.addFrais = async (request, response) => {
    let { design, montant, anneScolaire} = request.body;
    let contenu = `un nouveau frais a  paye`;
    try {
        (await FraisModel.create({
            designation: design,
            montant: montant,
            anneScolaire: anneScolaire,
            statut: ['ajouté']
        })).save().then( async (data) => {
            if(data) {
                (await NotificationModel.create({
                    contenu: contenu,
                    recepteur: 'eleve',
                    motif: 'frais'
                }).then((data) =>{
                    if(data) return response.status(200).json(data);
                    else response.status(400).json({erreurMessage: 'notification non envoyee'})
                }))
            }
        })
    } catch (error) {
        return console.log(error);
    }
}
module.exports.deleteFraisCorbeille = async (request, response) => {
    try {
        (await FraisModel.findByIdAndUpdate(
            {_id: request.params.id}, 
            {
                $set: {
                    statut: ["supprimé"]
                }
            }, 
            { new: true, upsert: true })
        ).then((data) => {
            if (data) return response.status(200).json(data);
        })
    } catch (error) {
        console.error(error);
    }
}

module.exports.updateFrais = async (request, response) => {
    try {
        (await FraisModel.findByIdAndUpdate(
            {_id: request.params.id},
            {
                $set: {
                    designation: request.body.design,
                    montant: request.body.montant,
                    anneScolaire: request.body.anneScolaire,
                    statut: ["modifié"]
                }
            },
            {new: true, upsert: true }
        )).then((data) => {
            if(data) return response.status(200).json(data);
        })
    } catch (error) {
        console.error(error);
    }
}

module.exports.deleteFrais = async (request, response) => {
    try {
        (await FraisModel.findOneAndDelete({_id: request.params.id}).then((data) => {
            if (data) {
                return response.status(200).json([{data}, {msg: 'frais suprimé avec succes'}]);
            }
        }))
    } catch (error) {
        console.error(error);
    }
}