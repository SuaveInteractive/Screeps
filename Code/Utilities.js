var energy = require('Utility.Energy');
var energyIncome = require('Utility.EnergyIncome');
var roomController = require('Utility.UpgradeRoomController');
var buildContainer = require('Utility.BuildContainer');
var UtilitySpawnLabourer = require('Utility.SpawnLabourer');

module.exports = {
    UtiliesDef: 
    {
        'ENERGY': energy.UtilityEnergy,
        'ENERGY_INCOME': energyIncome.UtilityEnergyIncoming,
        'UPGRADE_ROOM_CONTROLLER': roomController.UpgradeRoomController,
        'BUILD_CONTAINER': buildContainer.UtilityBuildContainer,
        'SPAWN_LABOURER': UtilitySpawnLabourer,
    }
};
