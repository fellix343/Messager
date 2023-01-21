const { User } = require("../models/models");
const jwt = require("jsonwebtoken");
let checkUserConnect = true;
const UserController = async (name, room) => {
    try {
        if (!name || !room) {
            return console.log("User not found");
        }

        const candidate = await User.findOne({
            where: { name: name, room: room },
        });
        if (!candidate) {
            var user = await User.create({
                name: name,
                room: room,
            });
        }

        return candidate || user;
    } catch (e) {
        console.log(e.message);
    }
};

(module.exports = { UserController }), checkUserConnect;
