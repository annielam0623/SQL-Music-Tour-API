//DEPENDENCIES
const { Op } = require('sequelize')
const stages = require('express').Router()
const db = require('../models')
const { Stage } = db

//Index Route
stages.get('/', async (req, res) => {
    console.log('Index Route:', req.url);
    try {
        const foundStages = await Stage.findAll({
            where: {
                stage_name: { [Op.like]: `%${req.query.stage_name ? req.query.stage_name : ''}%`}
            },
        })
        res.status(200).json(foundStages)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
})


//CREATE
stages.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.status(201).json({message: 'Stage created', data: newStage })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
})

//UPDATE
stages.put('/', async (req, res) => {
    try {
        const updatestages = await Stage.update(req.body, {
            where: { stage_id: req.params.id }
        })
        res.status(202).json({message: `${updatestages} Stage(s) updated` })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
})

//SHOW
stages.get('/:id', async (req, res) => {
    console.log('Show Route:', req.url);
    try {
        const foundStages = await Stage.findOne({
            where: { stage_id: req.params.id }
        })
        res.status(200).json(foundStages)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
})

//DELETE
stages.delete('/:id', async(req, res) => {
    try {
        const deletestages = await Stage.destroy({
            where: { stage_id: req.params.id } 
        })
        res.status(200).json({ message: `${deletestages} stage(s) deleted`})
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
})

//EXPORT
module.exports = stages;
