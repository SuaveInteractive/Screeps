var energy = require('Utility.Energy');
var energyIncome = require('Utility.EnergyIncome');
var roomController = require('Utility.UpgradeRoomController');

module.exports = {
    UtiliesDef: 
    {
        'ENERGY': energy.UtilityEnergy,
        'ENERGY_INCOME': energyIncome.UtilityEnergyIncoming,
        'UPGRADE_ROOM_CONTROLLER': roomController.UpgradeRoomController
    }
};
