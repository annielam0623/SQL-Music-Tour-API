//DEPENDENCIES
const { Op } = require('sequelize')
const bands = require('express').Router()
// const { DELETE } = require('sequelize/types/query-types')
const db = require('../models')
const { Band } = db

//Index Route
bands.get('/', async (req, res) => {
    console.log('Index Route:', req.url);
    try {
        const foundBands = await Band.findAll({
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%`},
            },
        });
        res.status(200).json(foundBands)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
})


//CREATE
bands.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body)
        res.status(201).json({message: 'Band created', data: newBand })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
})

//UPDATE
bands.put('/', async (req, res) => {
    try {
        const updateBands = await Band.update(req.body, {
            where: { band_id: req.params.id }
        })
        res.status(202).json({message: `${updateBands} band(s) updated` })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
})

//SHOW
bands.get('/:id', async (req, res) => {
    console.log('Show Route:', req.url);
    try {
        const foundBands = await Band.findOne({
            where: { band_id: req.params.id }
        })
        res.status(200).json(foundBands)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
})

//DELETE
bands.delete('/:id', async(req, res) => {
    try {
        const deleteBands = await Band.destroy({
            where: { band_id: req.params.id } 
        })
        res.status(200).json({ message: `${deleteBands} band(s) deleted`})
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
})


//EXPORT
module.exports = bands;
