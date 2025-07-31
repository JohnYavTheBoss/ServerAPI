const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ComptableModel = require("../models/comptable");
const EleveModel = require("../models/eleve");

const TOKEN_SECRET =
  "kjdbck3WEOFUHSOFDUHSDSJ0998765554433221234567KJBKBKBKHHHhjhbksdbcvksbk";
const createToken = (id) => {
  return jwt.sign({ id }, TOKEN_SECRET, {
    expiresIn: 365 * 24 * 60 * 60 * 1000,
  });
};

module.exports.signInEleve = async (request, response) => {
  let { nom, postnom, prenom, telephone, psw } = request.body;
  var password = await bcrypt.hashSync(psw, await bcrypt.genSaltSync(10));

  let generateIDeleve = () => {
    return "EST" + Math.floor(100000 + Math.random() * 900000);
  };
  var idEleve = generateIDeleve();
  try {
    await EleveModel.findOne({ telephone: telephone }).then(async (data) => {
      if (data) {
        return response
          .status(400)
          .json({
            error:
              "Ce numéro de téléphone est déjà pris, Choisissez un autre !",
          });
      } else {
        (
          await EleveModel.create({
            nom: nom,
            postnom: postnom,
            prenom: prenom,
            telephone: telephone,
            password: password,
            idenfient: idEleve,
          })
        )
          .save()
          .then((data) => {
            if (data) {
              var token = createToken(data._id);
              response.cookie("jwt", token, {
                httpOnly: true,
                maxAge: 365 * 24 * 60 * 60 * 1000,
              });
              return response.status(200).json(data);
            }
          });
      }
    });
  } catch (error) {
    return response.status(400).send({ error });
  }
};

module.exports.loginEleve = async (request, response) => {
  let { login, psw } = request.body;

  try {
    await EleveModel.findOne({
      $or: [{ telephone: login }, { idenfient: login }],
    }).then((data) => {
      if (data) {
        (async () => {
          var password = await bcrypt.compareSync(psw, data.password);
          if (password === true) {
            var token = createToken(data._id);
            response.cookie("jwt", token, {
              httpOnly: true,
              maxAge: 365 * 24 * 60 * 60 * 1000,
            });
            return response.status(200).json(data);
          } else {
            return response.status(401).send("Le mot de passe est incorrect");
          }
        })();
      } else {
        return response
          .status(400)
          .send("Numéro de téléphone ou identifiant incorrect");
      }
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports.signInComptable = async (request, response) => {
  let { nom, postnom, prenom, telephone, psw } = request.body;
  var password = await bcrypt.hashSync(psw, await bcrypt.genSaltSync(10));

  try {
    await ComptableModel.findOne({ telephone: telephone }).then(
      async (data) => {
        if (data) {
          return response
            .status(400)
            .json({
              error:
                "Ce numéro de téléphone est déjà utilisé, Veuillez utiliser un autre",
            });
        } else {
          (
            await ComptableModel.create({
              nom: nom,
              postnom: postnom,
              prenom: prenom,
              telephone: telephone,
              password: password,
            })
          )
            .save()
            .then((data) => {
              var token = createToken(data._id);
              response.cookie("jwt", token, {
                httpOnly: true,
                maxAge: 365 * 24 * 60 * 60 * 1000,
              });
              if (data) return response.status(200).json(data);
            });
        }
      }
    );
  } catch (error) {
    return response.status(400).send({ error });
  }
};

module.exports.loginComptable = async (request, response) => {
  let { login, psw } = request.body;

  try {
    await ComptableModel.findOne({
      $or: [{ telephone: login }, { matricule: login }],
    }).then((data) => {
      if (data) {
        (async () => {
          var password = await bcrypt.compareSync(psw, data.password);
          if (password == true) {
            var token = createToken(data._id);
            response.cookie("jwt", token, {
              httpOnly: true,
              maxAge: 365 * 24 * 60 * 60 * 1000,
            });
            return response.status(200).json(data);
          } else {
            return response.status(400).send("Le mot de passe est incorrect");
          }
        })();
      } else {
        return response.status(400).send("Numéro de téléphone incorrect");
      }
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports.logout = async (request, response) => {
  response.cookie("jwt", "", { maxAge: 1 });
  console.log("cookie suprimer avec succes");
  response.redirect("/");
};
