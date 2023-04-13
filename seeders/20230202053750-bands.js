'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('bands', [{
      name: 'The Useful Books',
      genre: 'Rock',
      start_time: '2023-06-22 19:00:00',
      end_time: '2023-06-22 23:00:00'
    },
    {
      name: 'U2',
      genre: 'Alternative',
      start_time: '2023-06-20 19:00:00',
      end_time: '2023-06-20 23:00:00'
    }])
  },

  down: async (queryInterface, Sequelize) => {
    // note that this deletes ALL data from the bands table
    await queryInterface.bulkDelete('bands', null, {})
  }
}