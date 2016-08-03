var harvestEnergy = require('Plan.HarvestEnergy');
var buildContainer = require('Plan.BuildContainer');
var SpawnLabourers = require('Plan.SpawnLabourers');

module.exports = {
    AIPlans: 
    {
        'HARVEST_ENERGY': harvestEnergy.HarvestEnergy,
        'BUILD_CONTAINER': buildContainer.BuildContainer,
        'SPAWN_LABOURERS': SpawnLabourers,
    }
};

