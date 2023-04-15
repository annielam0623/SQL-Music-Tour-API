//DEPENDENCIES
const { Op } = require('sequelize')
const bands = require('express').Router()
const db = require('../models')
const { Band, Meet_greet, Event, Set_time } = db

//Index Route
bands.get('/', async (req, res) => {
    console.log('Index Route:', req.url);
    try {
        const foundBands = await Band.findAll({
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%`}
            },
        })
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
bands.get('/:name', async (req, res) => {
    console.log('Show Route:', req.url);
    try {
        const foundBand = await Band.findOne({
            where: { name: req.params.name },
            include: [
            {
                model: Meet_greet,
                as: 'meet_greet',
                include: {
                    model: Event,
                    as: 'events',
                    where: {
                        name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%`}
                    },
                }
            },
            {
                model: Set_time,
                as: 'set_times',
                include: {
                    model: Event,
                    as: 'events',
                    where: {
                        name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%`}
                    },
                }
            }
        ]
        })
        res.status(200).json(foundBand)
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
