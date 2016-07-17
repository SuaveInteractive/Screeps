
var utilityTypes = require('Utility.Types');
var utilityEnergy = require('Utility.Energy');
var utilityEnergyIncome = require('Utility.EnergyIncome');

var utilities = [utilityEnergy, utilityEnergyIncome]

module.exports = {
	_Debugging: true,
	
    Calculate: function (world, plans)
    {
		if (this._Debugging)
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
        

        if (this._Debugging)
        {
            _.forEach(utilityTypes, function(util) {
               console.log(util + ": " + needs[util]);
            });
        }
		
		return needs
    }
};