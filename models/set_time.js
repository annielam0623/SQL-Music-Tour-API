'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Set_time extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Band, Event, Stage}) {
      Set_time.belongsTo(Band, {           
        foreignKey: 'band_id',
        as: 'bands'
      })

      Set_time.belongsTo(Event, {
        foreignKey: 'event_id',
        as: 'events'
      })

      Set_time.belongsTo(Stage, {
        foreignKey: 'stage_id',
        as: 'stages'
      })
    }
  }
  Set_time.init({
    set_time_id:DataTypes.INTEGER,
    event_id: DataTypes.INTEGER,
    stage_id: DataTypes.INTEGER,
    band_id: DataTypes.INTEGER,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Set_time',
    tableName: 'set_times',
    timestamps: false
  });
  return Set_time;
};