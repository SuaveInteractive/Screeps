var harvestEnergy = require('Plan.HarvestEnergy');
var buildContainer = require('Plan.BuildContainer');

module.exports = {
    AIPlans: 
    {
        'HARVEST_ENERGY': harvestEnergy.HarvestEnergy,
        'BUILD_CONTAINER': buildContainer.BuildContainer,
    }
};

