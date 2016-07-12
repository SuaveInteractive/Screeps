this._Debugging = true

var utilityTypes = require('Utility.Types');
var utilityEnergy = require('Utility.Energy');

var utilities = [utilityEnergy]

module.exports = {

    Calculate: function (world, plans)
    {
        console.log("AI.CalculateNeeds -> Calculate")
        var needs = {}
        _.forEach(utilityTypes, function(util) {
            needs[util] = 0;
        });
        
        _.forEach(utilities, function(utility)
        {
            var result = utility.Calculate(world)
            needs[result.UtilType] = needs[result.UtilType] + result.Value
        });
        

        // Calculate
        if (_Debugging)
        {
            _.forEach(utilityTypes, function(util) {
               console.log(util + ": " + needs[util]);
            });
        }
        
    }
};