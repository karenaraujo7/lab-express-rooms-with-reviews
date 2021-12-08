const express = require("express");

const router = express.Router();

// Importar o modelo da coleção 
const RoomsModel = require('../models/Rooms.model')

// CRUD

// 1- POST (criar)
router.post('/created-room', async(req, res) => {
    try {
        // Estrai as informações do corpo da requisição
        console.log(req.body);
        // Inserir no banco
        const result = await RoomsModel.create(req.body)
        // Responder a requisição 
            // Pela regra do REST, a resposta de uma inserção deve conter o registro recém-inserido com status 201 de (Created)
        res.status(201).json(result)
    } catch (err){
        console.log(err);
        res.status(500).json(err)
    } 
});

// GET (lista)
router.get('/rooms', async (req,res) => {
    try {
        // Buscar informções no banco
        const rooms = await RoomsModel.find()
        // Responder a requisição
        res.status(200).json(rooms)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

// GET (Detalhe)
router.get('/rooms/:id', async (req, res) => {
    try{
        // Buscar informações
        const room = await RoomsModel.findOne({_id: req.params.id})
        // Verificar se o banco encontrou o produto
        if (!room) {
            return res.status(404).json("Sala não existe")
        }
        //responder a requisição
        res.status(200).json(room)
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
});

// PUT (Atualização destrutiva)
// PATCH (Edição/Atualização não-destrutiva)

router.patch('/rooms/:id', async (req, res) => {
    try {

        const result = await RoomsModel.findOneAndUpdate(
            {_id: req.params.id}, 
            {$set: req.body},
            {new: true, runValidators: true}
        );

        if (!result) {
            return res.status(404).json({msg: 'Sala não existe'})
        }

        res.status(200).json(result)
    } catch (err){
        console.log(err);
        res.status(500).json(err)
    }
});

// DELETE (Deletar)

router.delete('/rooms/:id', async (req, res) => {
    try {
        const result = await RoomsModel.deleteOne({_id: req.params.id})

        if (result.deletedCount < 1) {
            return res.status(404).json({msg :"Sala não encontrada"})
        }

        res.status(200).json({});
    } catch (err){
        console.log(err)
        res.status(500).json(err)
    }
});

module.exports = router;