const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
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

exports.Announcement = mongoose.model("Announcement", announcementSchema);
