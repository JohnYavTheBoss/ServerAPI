const NotificationModel = require("../models/notification");

module.exports.sendNotification = async (request, response) => {
  try {
    (
      await NotificationModel.create({
        recepteur: request.body.recepteur,
        contenu: request.body.contenu,
        motif: "paiment",
      })
    )
      .save()
      .then((data) => {
        if (data) return response.status(200).json(data);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getNotifications = async (request, response) => {
    try {
    await NotificationModel.find()
      .sort({ createdAt: -1 })
      .then((data) => {
        if (data) return response.status(200).json(data);
      });
  } catch (error) {
    console.log(error);
  }
};
