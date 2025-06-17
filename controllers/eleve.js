const EleveModel = require('../models/eleve');

module.exports.getEleve = async (request, response) => {
    try {
        EleveModel.findOne({_id: request.params.id}).then((data) => {
            if(data) {
                return response.status(200).json(data);
            }else {
                return response.status(400).json({error: "quelque chose s'est mal passé"})
            }
        })
    } catch (error) {
        console.log(error);
        
    }
}

module.exports.getAllEleve = async (request, response) => {
    try {
        (await EleveModel.find().then((data) => {
            return response.status(200).json(data);
        }))
    } catch (error) {
        
    }
}