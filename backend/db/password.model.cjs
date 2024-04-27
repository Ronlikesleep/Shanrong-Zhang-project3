const model = require('mongoose').model;

const PasswordSchema = require('./password.schema.cjs');

const PasswordModel = model('Password', PasswordSchema);

const insertPassword = async (newPassword) => {
    return PasswordModel.create(newPassword); 
};

function getAllPassword() {
    return PasswordModel.find().exec();
}

function getPasswordById(id) {
    return PasswordModel.findById(id).exec();
}

function deletePassword(id) {
    return PasswordModel.deleteOne({ _id: id })
}

function updatePassword(id, Password) {
    return PasswordModel.findOneAndUpdate({ _id: id }, Password)
}

function getPasswordByOwner(owner) {
    return PasswordModel.find({
        owner: owner,
    }).exec();
}

module.exports = {
    getPasswordById,
    deletePassword,
    updatePassword,
    insertPassword,
    getAllPassword,
    getPasswordByOwner
}