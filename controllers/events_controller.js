//DEPENDENCIES
const { Op } = require('sequelize')
const events = require('express').Router()
const db = require('../models')
const meet_greet = require('../models/meet_greet')
const { Event, Band, Stage, Meet_greet, Set_time } = db

//Index Route
events.get('/', async (req, res) => {
    console.log('Index Route:', req.url);
    try {
        const foundEvents = await Event.findAll({
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%`}
            },
        })
        res.status(200).json(foundEvents)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
})


//CREATE
events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(201).json({message: 'Event created', data: newEvent })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
})

//UPDATE
events.put('/', async (req, res) => {
    try {
        const updateevents = await Event.update(req.body, {
            where: { event_id: req.params.id }
        })
        res.status(202).json({message: `${updateevents} event(s) updated` })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
})

//SHOW
events.get('/:name', async (req, res) => {
    console.log('Show Route:', req.url);
    try {
        const foundEvents = await Event.findOne({
            where: { name: req.params.name },
            include: [
                {
                    model: Meet_greet,
                    as: 'meet_greet',
                    include: {
                        medel: Band,
                        as: 'bands'
                    }
                },
                {
                    model: Set_time,
                    as: 'set_times',
                    include: [
                       {
                        medel: Band,
                        as: 'band',
                       },
                       {
                        model: Stage,
                        as: 'stages'
                        },
                    ]
                },
                {
                    model: Stage,
                    as: 'stages',
                    through: { attributes: []},
                }
            ]
        })
        res.status(200).json(foundEvents)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
})

//DELETE
events.delete('/:id', async(req, res) => {
    try {
        const deleteevents = await Event.destroy({
            where: { event_id: req.params.id } 
        })
        res.status(200).json({ message: `${deleteevents} Event(s) deleted`})
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
})

//EXPORT
module.exports = events;
