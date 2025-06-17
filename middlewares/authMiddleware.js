const jwt = require('jsonwebtoken');
const EleveModel = require("../models/eleve");

const TOKEN_SECRET = 'kjdbck3WEOFUHSOFDUHSDSJ0998765554433221234567KJBKBKBKHHHhjhbksdbcvksbk';

module.exports.checkEleve = async (request, response, next) => {
    const token = request.cookies.jwt;
    if (token) {
        jwt.verify(token, TOKEN_SECRET, async (err, decodeToken) => {
            if (err) {
                response.locals.eleve = null;
                //response.cookies('jwt', '', {maxAxe: 1});
                next();
            } else {
                let eleve = await EleveModel.findById(decodeToken.id);
                response.locals.eleve = eleve;
                console.log(response.locals.eleve);
                next();
            }
        });
    } else {
        response.locals.eleve = null;
        next();
    }
}

module.exports.requireAuth = async (request, response, next) => {
    const token = request.cookies.jwt;
    if (token) {
        jwt.verify(token, TOKEN_SECRET, async (err, decodeToken) => {
            if (err) {
                console.log(err);
            } else {
                console.log(decodeToken.id);
                next();
            }
        });
    } else return console.log('utilisateur inconnu ou aucun utilisateur connecté');
};