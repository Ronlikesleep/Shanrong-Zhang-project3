const cookieHelper = require('./cookie.helper.cjs');

const express = require('express');
const router = express.Router();
const PasswordModel = require('../db/password.model.cjs')

router.post('/', async function (req, res) {
    const requestBody = req.body;
    const username = cookieHelper.cookieDecryptor(req);

    if (!username) {
        res.status(401);
        return res.send("You need to be logged in to create a account!")
    }

    if (!requestBody.account || !requestBody.password) {
        res.status(401);
        return res.send("Please insert valid Pokemon Name and Color!")
    }

    const newPassword = {
        account: requestBody.account,
        password: requestBody.password,
        owner: username,
    }

    try {
        const response = await PasswordModel.insertPassword(newPassword);
        res.cookie('owner', username);
        // res.cookie('favoriteColor', 'yellow');
        return res.status(201).send(response);
    } catch (error) {
        res.status(400);
        return res.send(error);
    }
})

// /api/pokemon/pikachu
// --> pkId => pikachu
router.put('/:pkId', async function (req, res) {
    const passwordId = req.params.pkId;
    const passwordData = req.body;
    const owner = cookieHelper.cookieDecryptor(req);

    if (!owner) {
        res.status(401);
        return res.send("You need to be logged in to create a pokemon!")
    }
    //to do: need to modify
    if (!passwordData.name || !passwordData.color) {
        res.status(400);
        return res.send("You need to include the pokemon name and color in your request");
    }

    try {
        // verify that this pokemon is owned by this user
        const getPasswordResponse = await PasswordModel.getPasswordById(passwordId);
        if (getPasswordResponse !== null && getPasswordResponse.owner !== owner) {
            res.status(400);
            return res.send("You do not own this Pokemon!");
        }

        const passwordUpdateResponse = await PasswordModel.updatePassword(passwordId, passwordData);
        return res.send('Successfully updated pokemon ID ' + passwordId)
    } catch (error) {
        res.status(400);
        return res.send(error);
    }
})



// -> /pokemon/pikachu => req.params.pokemonName === pikachu
// -> /pokemon/pikachu?food=banana
router.get('/:pkId', async function (req, res) {
    const passwordId = req.params.pkId;


    try {
        const getPasswordResponse = await PasswordModel.getPasswordById(passwordId);
        return res.send(getPasswordResponse);
    } catch (error) {
        res.status(400);
        return res.send(error);
    }

    // res.status(404);
    // return res.send("Pokemon with name " + pokemonName + " not found :(");
})

router.delete('/:passwordId', async function (req, res) {
    const passwordId = req.params.passwordId;
    const owner = cookieHelper.cookieDecryptor(req);

    if (!owner) {
        res.status(401);
        return res.send("You need to be logged in to create a pokemon!")
    }

    try {
        const getPasswordResponse = await PasswordModel.getPasswordById(passwordId);
        if (getPasswordResponse !== null && getPasswordResponse.owner !== owner) {
            res.status(400);
            return res.send("You do not own this Pokemon!");
        }

        const deletePasswordResponse = await PasswordModel.deletePassword(passwordId);
        return res.send(deletePasswordResponse);
    } catch (error) {
        res.status(400);
        return res.send(error);
    }

})

// localhost:8000/api/pokemon?name=pikachu
router.get('/', async function (req, res) {
    const owner = cookieHelper.cookieDecryptor(req);

    if (!owner) {
        res.status(401);
        return res.send("You need to be logged in to create a pokemon!")
    }

    try {
        const allPasswordResponse = await PasswordModel.getPasswordByOwner(owner);
        return res.send(allPasswordResponse);
    } catch (error) {
        res.status(400);
        return res.send("Error inserting Pokemon into DB :/");
    }

})


module.exports = router;