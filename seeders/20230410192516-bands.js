'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize) => {
       await queryInterface.bulkInsert('bands', [{
       name: 'Rose n Guns',
       genre: 'Rock',
       start_time: '2023-10-21 11:00:00',
       end_time: '2023-10-21 11:30:00'
    }])
   },

  down: async(queryInterface, Sequelize) => {
   
    await queryInterface.bulkDelete('bands', null, {});
    
  }
};
