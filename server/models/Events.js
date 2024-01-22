const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        author_id: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        content: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

exports.Event = mongoose.model("Event", eventSchema);
