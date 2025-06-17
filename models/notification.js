const mongoose = require("mongoose");
const Schemas = mongoose.Schema;

const notificationSchemas = new Schemas({
    contenu: {
        type: String,
    },
    dateEnvoi: {
        type: Date,
        default: new Date().getDate()
    },
    motif: {
        type: String
    },
    recepteur: {
        type: String
    }
}, {
    timestamps: true
});

const NotificationModel = mongoose.model("notification", notificationSchemas);
module.exports = NotificationModel;